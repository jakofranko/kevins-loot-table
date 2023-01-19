/**
 * Item - a magic item.
 *
 * @param    {string} name
 * @param    {number} description
 * @param    {string} rarity
 * @param    {string} player
 * @param    {number} index
 *
 * @property {string} name
 * @property {number} description
 * @property {string} rarity
 * @property {string} player
 * @property {number} index
 *
 * @returns  {Object}              This Item.
 */
export default function Item({
    name,
    description,
    rarity,
    player,
    index,
}) {
    this.name = name;
    this.description = description;
    this.rarity = rarity;
    this.player = player;
    this.index = index;

    this.toString = () => `${this.name} (${rarity})`;

    return this;
}
