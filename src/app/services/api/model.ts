const dbExample = {
    teams: { // Collection
        team1: {
            onCompleteEmail: 'email@email.com', // Updates the org
            replyToEmail: 'email@email.com',
            name: 'org1',
            emailLogo: './images/logo.png',
            emailHeader: 'Any valid HTML can go here. Images, whatever',
            emailBody: 'Any valid HTML can go here. Images, whatever',
            emailFooter: 'Any valid HTML can go here. Images, whatever',
            emailStyles: '<style>.style { color: blue } </style>',
            categories: ['cat1', 'cat2'],
            checklists: { // Sub Collection
                checklist1: {
                    name: 'checklist1',
                    category: 'cat1',
                    onFinishEmail: 'email@email.com', // Only applicable to client based checklists
                    steps: {
                        step1: {
                            name: 'step1',
                            detail: 'This is the detail'
                        }
                    }
                }
            },
            users: { // Sub Collection
                user1: {
                    name: 'User',
                    email: 'username@email.com',
                    role: 'Manager'
                }
            },
            clients: { // Sub Collection
                client1: {
                    name: 'client1',
                    email: 'client@gmail.com',
                    address: '300 Address St, Address',
                }
            },
            inProgress: { // Sub Collection
                checklist1: {
                    name: 'checklist1',
                    uid: 'uid1',
                    shared: false,
                    onFinishEmail: 'email@email.com',
                    steps: {
                        step1: {
                            name: 'step1',
                            detail: 'This is the detail',
                            completed: true
                        }
                    },
                    notes: 'This is a note about the checklist'
                }
            }
        }
    },
    users: { // Collection
        user1: {
            name: 'Username',
            email: 'email@email.com',
            activeTeam: 'id',
            teams: {
                team1: {
                    name: 'team1',
                    role: 'user',
                },
                team2: {
                    name: 'team2',
                    role: 'owner',
                }
            }
        }
    }
}

// teams/{ref}
// teams/{ref}/users
// teams/{ref}/users/{ref}
// teams/{ref}/clients
// teams/{ref}/clients/{ref}
// teams/{ref}/inprogress
// teams/{ref}/inprogress/{ref}
// teams/{ref}/checklists
// teams/{ref}/checklists/{ref}
// users/{ref}

