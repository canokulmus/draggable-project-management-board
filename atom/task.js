//atom with storage
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai';

const initialData = {
    tasks: {
        1: {
            id: 1, title: "Create Web Server",
            notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit`},
        2: {
            id: 2, title: "Configure Next.js and tailwind ", notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit` },
        3: {
            id: 3, title: "MongoDB Customization", notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit`  },
        4: {
            id: 4, title: "ML Algorithm", notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit`  },
        5: {
            id: 5, title: "Web Scraping Algorithm", notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit`  },
        6: {
            id: 6, title: "Connection of algorithms", notes: `-Lorem ipsum dolor sit amet
            -Consectetur adipiscing elit`  },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "TO-DO",
            taskIds: [1, 2, 3, 4],
        },
        "column-2": {
            id: "column-2",
            title: "IN-PROGRESS",
            taskIds: [5, 6],
        },
        "column-3": {
            id: "column-3",
            title: "COMPLETED",
            taskIds: [],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3"],
};

export const tasks = atomWithStorage("tasks", initialData) //for local storage
// export const tasks = atom(initialData)
