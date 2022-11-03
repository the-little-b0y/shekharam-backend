import { hash, compare } from 'bcrypt';

const saltRounds = 10;

/**
 * Get hashed output for an input word.
 * @param {string} word - Word to hash.
 * @returns {Promise<string>} Hashed word on success, else false.
 */
export const encrypt = async (word: string): Promise<string> => {
    const hashedWord: string = await hash(word, saltRounds);
    return hashedWord
}

/**
 * Check if a word and a hashed word pass the hash test.
 * @param {string} word - Word to check.
 * @param {string} hashedWord - Hashed word to check against.
 * @returns {Promise<boolean>} Boolean result of hash test.
 */
export const decrypt = async (word: string, hashedWord: string): Promise<boolean> => {
    const matched: boolean = await compare(word, hashedWord);
    return matched;
}