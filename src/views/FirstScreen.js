import m from 'mithril';
import ItemTable from '../components/ItemTable';
import PlayerTables from '../components/PlayerTables';

const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];
const options = rarities.map(rarity => m(`option[value=${rarity}]`, rarity));

export default function FirstScreen() {
    return {
        view: ({ attrs: { state, actions } }) => m('#first-screen', [
            m('h2.lhs.mb3', [
                m('span.mr3', 'Vault of Magic Items'),
                m('button', {
                    type: 'button',
                    class: 'bg-blu blanc p3 br1',
                    onclick: () => {
                        const result = Math.floor(Math.random() * (state.items.length));
                        alert(`You rolled ${result}: ${state.items[result]}`);
                    }
                }, 'Roll for Item')
            ]),
            m('div.r', [
                m('div.c6.mb3', [
                    m('form#new-magic-item', {
                        onsubmit: (e) => {
                            e.preventDefault();
                            const { target: form } = e;
                            const inputs = Array.from(form.elements);
                            const newIndex = state.items.length;

                            let item = {};
                            inputs.forEach((element) => {
                                if(element.id != "") item[element.id] = element.value;

                                element.value = "";
                            });

                            // Set index for item
                            item.index = newIndex;

                            actions.addItem(item);
                        }
                    }, [
                        m('label[for=name]', 'What is the item\'s name?'),
                        m('br'),
                        m('input', {
                            id: 'name',
                            class: 'bg-blanc br1 sh5-s vw7-s mb3 w9',
                            type: 'text',
                            placeholder: 'e.g., The Blade of Sunderring',
                        }),
                        m('br'),
                        m('label[for=description]', 'What is the item\'s description?'),
                        m('br'),
                        m('textarea', {
                            id: 'description',
                            class: 'bg-blanc br1 sh5-s vw7-s mb3 w9',
                            placeholder: 'e.g., This item is of such and such make and looks dope af with some bomb stats',
                        }),
                        m('br'),
                        m('label[for=rarity]', 'What is the item\'s rarity?'),
                        m('br'),
                        m('select', {
                            id: 'rarity',
                            class: 'bg-blanc br1 sh5-s vw7-s mb3',
                            placeholder: 'e.g., Uncommon',
                        }, options),
                        m('br'),
                        m('label[for=player]', 'Who is this item for?'),
                        m('br'),
                        m('input', {
                            id: 'player',
                            class: 'bg-blanc br1 sh5-s vw7-s mb3 w9',
                            type: 'text',
                            placeholder: 'e.g., The Player that Kevin Loves the Most (Jake)',
                        }),
                        m('br'),
                        m('button', {
                            type: 'submit',
                            class: 'bg-blu blanc p3 br1 f5'
                        },'Add Item')
                    ])
                ]),
                m('div.c6.mb3', [
                    m(ItemTable, { items: state.items, actions })
                ])
            ]),
            m(PlayerTables, { items: state.items, actions })
        ])
    }
}
