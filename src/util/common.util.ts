/**
 * ANCHOR Title
 * @date 9/12/2024 - 7:08:03 AM
 *
 * @export
 * @param {...string[]} texts
 * @returns {string}
 */
export function titleUtil(...texts: string[]): string {
    let title: string = process.env.NEXT_PUBLIC_BRAND;

    if (texts.length > 0) {
        texts.reverse();

        return `${texts.join(' ← ')} - ${title}`;
    }

    return title;
}
