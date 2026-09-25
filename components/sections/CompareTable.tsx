import { Icon } from "@/components/ui/Icon";
import { COMPARE_GROUPS, type Mark } from "@/lib/comparison";

/* What a screen reader hears in place of each mark. */
const SPOKEN: Record<Mark, string> = {
  yes: "Included",
  no: "Not included",
  addon: "Paid add-on",
  additional: "Charged separately",
};

/* The marks come from the site's own icon set (components/ui/Icon.tsx), as
   plain line icons: a filled disc behind a white tick read as an emoji. */
export function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") return <Icon name="check" className="db-cmp__yes" />;
  if (mark === "no") return <Icon name="x" className="db-cmp__no" />;
  return (
    <span className={`db-cmp__pill db-cmp__pill--${mark}`} aria-hidden="true">
      {mark === "addon" ? "Add-on" : "Additional"}
    </span>
  );
}

/**
 * The comparison as a table, not a picture of one.
 *
 * Our column is one continuous panel from the header to the last row — the
 * "recommended plan" treatment — and the header row sticks under the site
 * header while the rows scroll past it, so the two columns never lose
 * their names. Group headings carry their row count.
 */
export default function CompareTable() {
  return (
    /* db-cmp--light: the white-table experiment. Remove the modifier to go
       back to the charcoal card. */
    <div className="db-cmp db-cmp--light">
      <table className="db-cmp__table">
        <caption className="sr-only">
          DatabaseBuilder compared with other CRMs, feature by feature
        </caption>
        <thead>
          <tr>
            <th scope="col" className="db-cmp__h db-cmp__h--feature">
              Features
            </th>
            <th scope="col" className="db-cmp__h db-cmp__us">
              <span className="db-cmp__name">
                <span>Database</span>
                <span className="text-db-red">Builder</span>
              </span>
            </th>
            <th scope="col" className="db-cmp__h db-cmp__them">
              <span className="db-cmp__name">
                <span>Other</span> <span>CRMs</span>
              </span>
            </th>
          </tr>
        </thead>

        {COMPARE_GROUPS.map((group, gi) => (
          <tbody key={group.id}>
            {group.title ? (
              <tr className="db-cmp__group">
                <th scope="rowgroup">
                  <span className="db-cmp__group-label">
                    {group.icon && (
                      <span className="db-cmp__group-icon">
                        <Icon name={group.icon} />
                      </span>
                    )}
                    {/* title and count wrap as one unit, so the badge stays
                        beside the last word instead of at the cell's far edge */}
                    <span>
                      {group.title}
                      <span className="db-cmp__count" aria-hidden="true">
                        {group.rows.length}
                      </span>
                    </span>
                  </span>
                </th>
                {/* empty, but present, so our column's panel runs unbroken */}
                <td className="db-cmp__us" aria-hidden="true" />
                <td className="db-cmp__them" aria-hidden="true" />
              </tr>
            ) : gi > 0 ? (
              /* an untitled block in the chart: a rule and a little air,
                 cells present so the column panels run unbroken */
              <tr className="db-cmp__group db-cmp__group--bare" aria-hidden="true">
                <th />
                <td className="db-cmp__us" />
                <td className="db-cmp__them" />
              </tr>
            ) : null}
            {group.rows.map((r) => (
              <tr key={r.feature} className="db-cmp__row">
                <th scope="row">{r.feature}</th>
                <td className="db-cmp__us">
                  <MarkIcon mark={r.us} />
                  <span className="sr-only">{SPOKEN[r.us]}</span>
                </td>
                <td className="db-cmp__them">
                  <MarkIcon mark={r.them} />
                  <span className="sr-only">{SPOKEN[r.them]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
