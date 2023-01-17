import m from 'mithril';

const EditableCell = {
    view: ({ attrs, children }) => {
        return m('td', {
            contenteditable: true,
            value: children,
            oninput: (e) => {
                e.preventDefault();
                e.redraw = false;

                const { target: { textContent } } = e;
                const { actions, index, field } = attrs;

                actions.updateItem(index, field, textContent);
            }
        }, m.trust(children))
    }
}

const ItemTable = {
    view: ({
        attrs: {
            items,
            actions
        }
    }) => {
        return m('table', [
            m('thead', [
                m('th', '#'),
                m('th', 'Name'),
                m('th', 'Description'),
                m('th', 'Rarity')
            ]),
            m('tbody', items.map((item) => {
                return m('tr', [
                    m('td', item.index),
                    m(EditableCell, {
                        actions,
                        index: item.index,
                        field: 'name'
                    }, item.name),
                    m(EditableCell, {
                        actions,
                        index: item.index,
                        field: 'description'
                    }, item.description),
                    m(EditableCell, {
                        actions,
                        index: item.index,
                        field: 'rarity'
                    }, item.rarity)
                ])
            }))
        ])
    }
}

export default ItemTable;
