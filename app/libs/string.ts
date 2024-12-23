import slugify from 'slugify'

/**
 * Slices a string to a maximum length and appends an ellipsis if necessary.
 *
 * @param {Object} options - The options for slicing the string.
 * @param {string} options.str - The string to be sliced.
 * @param {number} options.max - The maximum length of the resulting string including the ellipsis.
 * @param {string} [options.ellipsis='...'] - The string to append if the text is sliced. Default is '...'.
 * @returns {string} The sliced string with the ellipsis if it exceeds the maximum length.
 */
export const sliceString = ({
    str,
    max,
    ellipsis = '...'
}: {
    str: string
    max: number
    ellipsis?: string
}): string => {
    if (!str) return str
    if (str?.length <= max) return str

    const end = max - ellipsis.length
    return end > 0 ? `${str.slice(0, end)}${ellipsis}` : `${str.slice(0, max)}`
}

const CHAR_SET: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const CHAR_ARRAY: string[] = CHAR_SET.split('')

/**
 * Generates a random string of a specified length using a predefined character set.
 *
 * @param {number} length - The desired length of the random string.
 * @returns {string} A randomly generated string of the specified length.
 */
export const generateRandomText = (length: number): string => {
    const res = new Array(length)

    for (let i = 0; i < length; i++) {
        res[i] = CHAR_ARRAY[Math.floor(Math.random() * CHAR_ARRAY.length)]
    }

    return res.join('')
}

export const makeSlug = (str: string): string =>
    str.trim().length
        ? slugify(str, {
              trim: true,
              lower: true
          })
        : ''
