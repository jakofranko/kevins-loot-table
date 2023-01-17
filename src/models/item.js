/**
 * Item - a magic item.
 *
 * @param    {string} name
 * @param    {number} description
 * @param    {string} rarity
 * @param    {number} index
 *
 * @property {string} name
 * @property {number} description
 * @property {string} rarity
 * @returns  {Object}              This Item.
 */
export default function Item({ name, description, rarity, index }) {
    this.name = name;
    this.description = description;
    this.rarity = rarity;
    this.index = index;

    this.toString = () => `${this.name} (${rarity})`;

    return this;
}
