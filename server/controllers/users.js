import fs from "fs";
import { FILE_NAME } from "../constants/index.js";
// import { validate as uuidValidate } from "uuid";

export const getUsers = async (req, res) => {
    const users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`));

    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    const users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`));
    try {
        const theUser = users.find((user) => user.id === id);
        if (theUser === undefined) {
            return res.status(404).json("No user with such a id");
        }
        res.status(200).json(theUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const connectUser = async (req, res) => {
    const { id, dest_id } = req.params;
    try {
        // ID Validation (only for uuid)
        // if (!uuid.validate(id)) {
        //     return res.status(404).json(`No user with id ${id}`);
        // }

        if (id === dest_id) {
            return res.status(400).json(`You can't connect to yourself`);
        }
        const users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`));
        const toBeConnectedUser = users.find((u) => u.id === dest_id);
        const loggedUser = users.find((u) => u.id === id);
        const index = toBeConnectedUser.connectionId.findIndex(
            (tId) => tId === id
        );
        if (index === -1) {
            // Connect
            toBeConnectedUser.connectionId.push(id);
            loggedUser.connectionId.push(dest_id);
        } else {
            // Disconnect
            toBeConnectedUser.connectionId =
                toBeConnectedUser.connectionId.filter((tId) => tId !== id);
            loggedUser.connectionId = loggedUser.connectionId.filter(
                (tId) => tId !== dest_id
            );
        }
        fs.writeFileSync(`./db/${FILE_NAME}`, JSON.stringify(users), (err) =>
            console.log(err)
        );
        res.status(200).json(loggedUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getRelatedUsers = async (req, res) => {
    try {
        const { id } = req.params;
        let users = JSON.parse(fs.readFileSync(`./db/${FILE_NAME}`)); // All users
        const findUser = (id) => users.find((u) => u.id === id); // find user based on id
        let theUser = findUser(id); // Logged in user
        users = users.filter((u) => u.id !== id); // All users except logged in user
        let relatedIds = new Set(); // Users id related to logged in user

        const calcScore = (u) => {
            const {
                dateOfBirth,
                universityLocation,
                field,
                workplace,
                specialties,
            } = u;
            let score = 1;

            // YEAR
            let year = dateOfBirth.substr(0, 4),
                ageDiff = Math.abs(theUser.dateOfBirth.substr(0, 4) - year);
            if (ageDiff <= 10) {
                score += (10 - ageDiff) * 2;
            }

            // UNIVERSITY
            if (universityLocation === theUser.universityLocation) {
                score += 100;
            }

            // FIELD
            if (field === theUser.field) {
                score += 150;
            }

            // WORKPLACE
            if (workplace === theUser.workplace) {
                score += 150;
            }

            // SPECIALITIES
            const compare = (arr1, arr2) =>
                arr1.reduce((a, c) => a + arr2.includes(c), 0);
            score += compare(specialties, theUser.specialties) * 250;

            return score;
        };

        const get5LevelIds = () => {
            // deg(1)
            for (let i = 0; i < theUser.connectionId.length; i++) {
                if (theUser.connectionId[i] !== theUser.id) {
                    relatedIds.add(theUser.connectionId[i]);
                }
            }

            // deg(2) to deg(5)
            for (let l = 2; l <= 5; l++) {
                let newIds = [];
                relatedIds.forEach((item) => {
                    const tempUser = findUser(item);
                    for (let i = 0; i < tempUser.connectionId.length; i++) {
                        if (tempUser.connectionId[i] !== theUser.id) {
                            newIds.push(tempUser.connectionId[i]);
                        }
                    }
                });
                relatedIds = new Set([...relatedIds, ...newIds]);
            }

            relatedIds.delete(theUser.id);
        };
        get5LevelIds();
        let relatedUsers = [...relatedIds]; // Converting Set to Array
        relatedUsers = relatedUsers.map((item) => findUser(item)); // Find users

        // Applying scores
        relatedUsers = relatedUsers.map((u) => {
            return { ...u, score: calcScore(u) };
        });
        // Sort descending
        relatedUsers.sort((a, b) =>
            a.score > b.score ? -1 : a.score < b.score ? 1 : 0
        );

        // If users of first 5 levels are less than 20
        if (relatedUsers.length < 20) {
            users = users.map((u) => {
                return { ...u, score: calcScore(u) };
            });
            users.sort((a, b) =>
                a.score > b.score ? -1 : a.score < b.score ? 1 : 0
            );
            let result = [...relatedUsers],
                i = 0;
            while (result.length < 20 && i < users.length) {
                if (!relatedIds.has(users[i].id)) {
                    result.push(users[i]);
                }
                i++;
            }
            return res.status(200).json([...result]);
        }

        res.status(200).json(relatedUsers.slice(0, 20));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
