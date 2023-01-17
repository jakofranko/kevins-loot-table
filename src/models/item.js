/**
 * Item - a magic item.
 *
 * @param    {string} name
 * @param    {number} description
 * @param    {string} rarity
 *
 * @property {string} name
 * @property {number} description
 * @property {string} rarity
 * @returns  {Object}              This Item.
 */
export default function Item(name, description, rarity) {
    this.name = name;
    this.description = description;
    this.rarity = rarity;

    this.toString = () => `${this.name} (${rarity})`;

    return this;
}
