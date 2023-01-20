// This will allow entry of magic items (name, description, rarity),
// display those items in tables by rarity, and then be able to roll randomly for them
import m from 'mithril';
import 'macian';

import Layout from './views/Layout';
import FirstScreen from './views/FirstScreen';
import Item from './models/item';

// Local Storage
const DB = 'kevins-loot-table';

function initializeLocalStorage() {
    let initialData;

    if (!localStorage.getItem(DB)) {
        localStorage.setItem(DB, JSON.stringify({}));
    } else {
        initialData = JSON.parse(localStorage.getItem(DB));

        if (initialData.items) {
            // Set index values
            const withIndexes = initialData.items.map((item, index) => {
                if (item.index === undefined) {
                    console.log(`Setting index for ${item}`);
                    return { ...item, index };
                }

                return item;
            });

            initialData.items = withIndexes;
            localStorage.setItem(DB, JSON.stringify(initialData));

            // Check for duplicate indexes
            const hasDuplicateIndices = initialData.items.some((item, index, array) => {
                const dupes = array.filter(i => i.index === item.index);
                return dupes.length > 1;
            });

            if (hasDuplicateIndices) {
                const reIndexed = initialData.items.map((item, index) => {
                    item.index = index;
                    return item;
                });

                initialData.items = reIndexed;
                localStorage.setItem(DB, JSON.stringify(initialData));
            }
        }
    }
}

initializeLocalStorage();

const data = JSON.parse(localStorage.getItem(DB));

// Killer article on the topic of Mithril state management:
// https://kevinfiol.com/blog/simple-state-management-in-mithriljs/
const state = {
    items: data.items ? data.items.map(item => new Item(item)) : []
};

const actions = {
    addItem: (item) => {
        state.items.push(new Item(item));
        localStorage.setItem(DB, JSON.stringify(state));
    },
    updateItem: (index, key, value) => {
        const item = state.items[index];
        const newItem = {
            ...item,
            [key]: value
        };

        state.items.splice(index, 1, newItem);
        localStorage.setItem(DB, JSON.stringify(state));
    },
    removeItem: (index) => {
        const arrayIndex = state.items.findIndex(item => item.index === index);
        state.items.splice(arrayIndex, 1);
        localStorage.setItem(DB, JSON.stringify(state));
    },
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

m.route(root, '/table', {
    '/table': {
        render: () => m(Layout, m(FirstScreen, {
            state,
            actions
        }))
    },
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('service-worker.js', { scope: '/kevins-loot-table/' })
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
}
