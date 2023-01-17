// This will allow entry of magic items (name, description, rarity),
// display those items in tables by rarity, and then be able to roll randomly for them
import m from 'mithril';
import 'macian';

import Layout from './views/Layout';
import FirstScreen from './views/FirstScreen';
import Item from './models/item';

// Local Storage
const DB = 'kevins-loot-table';
if (!localStorage.getItem(DB)) localStorage.setItem(DB, JSON.stringify({}));

const data = JSON.parse(localStorage.getItem(DB));

// Killer article on the topic of Mithril state management:
// https://kevinfiol.com/blog/simple-state-management-in-mithriljs/
const state = {
    items: data.items || []
};

const actions = {
    addItem: (item) => {
        state.items.push(new Item(item.name, item.description, item.rarity));
        localStorage.setItem(DB, JSON.stringify(state));
    },
    removeItem: (index) => {
        state.items.splice(index, 1);
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
