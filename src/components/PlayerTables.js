import m from 'mithril';
import ItemTable from './ItemTable';

const PlayerTables = {
    view: ({
        attrs: {
            items,
            actions
        }
    }) => {
        const players = new Set(items.map(item => item.player));
        const itemsByPlayer = Array.from(players).reduce((byPlayer, player) => {
            const playerItems = items.filter((item) => item.player === player);
            byPlayer[player] = playerItems;

            return byPlayer;
        }, {});

        return m('div.r', Array.from(players).map(player => {
            return m('div.c4.mb4', [
                m('h3.mb3', [
                    m('span.mr4', `Items for ${player}`),
                    m('button', {
                        type: 'button',
                        class: 'bg-blu blanc p3 br1',
                        onclick: () => {
                            const result = Math.floor(Math.random() * (itemsByPlayer[player].length));
                            alert(`You rolled ${result}: ${itemsByPlayer[player][result]} for ${player}`);
                        }
                    }, `Roll item for ${player}`)
                ]),
                m(ItemTable, { items: itemsByPlayer[player], actions })
            ]);
        }))
    }
}

export default PlayerTables;
