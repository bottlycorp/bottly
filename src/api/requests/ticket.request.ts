import { gql } from 'graphql-request';

export const getTicketPanelOpenInfos = gql`
    query getTicketPanelInfos($guildId: String!, $panelId: String!) {
        ticketPanel(guildId: $guildId, panelId: $panelId) {
            _id,
            settings {
                general {
                    supportRoles,
                    limitPerUser
                },
                category {
                    open
                },
                permission {
                    support {
                        manageChannels,
                        sendMessages,
                        manageMessages,
                        embedLinks,
                        attachFiles,
                        addReactions
                    },
                    user {
                        manageChannels,
                        sendMessages,
                        manageMessages,
                        embedLinks,
                        attachFiles,
                        addReactions
                    }
                },
                button {
                    close {
                        enabled,
                        emoji,
                        label
                    }
                },
                message {
                    open {
                        color,
                        author {
                            name,
                            icon
                        },
                        thumbnail,
                        title,
                        description,
                        fields {
                            name,
                            value
                        },
                        footer {
                            text,
                            icon
                        }
                    }
                },
                panel {
                    message {
                        color,
                        author {
                            name,
                            icon
                        },
                        thumbnail,
                        title,
                        description,
                        fields {
                            name,
                            value
                        },
                        footer {
                            text,
                            icon
                        }
                    }
                },
            }
        }
    }
`;

export const createTicket = gql`
    mutation createTicket($guildId: String!, $panelId: String!, $authorId: String!, $authorName: String!) {
        createTicket(guildId: $guildId, panelId: $panelId, authorId: $authorId, authorName: $authorName) {
            _id,
            name,
            users
        }
    }
`;

export const closeTicket = gql`
    mutation closeTicket($guildId: String!, $ticketId: String!) {
        closeTicket(guildId: $guildId, ticketId: $ticketId) {
            _id,
            tickets {
                users
            },
            settings {
                button {
                    delete {
                        enabled,
                        emoji,
                        label
                    },
                    reopen {
                        enabled,
                        emoji,
                        label
                    }
                },
                moderatorMessage {
                    close {
                        color,
                        author {
                            name,
                            icon
                        },
                        thumbnail,
                        title,
                        description,
                        fields {
                            name,
                            value
                        },
                        footer {
                            text,
                            icon
                        }
                    }
                }
            }
        }
    }
`;

export const getTicketPanel = gql`
    query getTicketPanel($guildId: String!, $panelId: String!) {
        ticketPanel(guildId: $guildId, panelId: $panelId) {
            settings {
                moderatorMessage {
                    delete {
                        color,
                        author {
                            name,
                            icon
                        },
                        thumbnail,
                        title,
                        description,
                        fields {
                            name,
                            value
                        },
                        footer {
                            text,
                            icon
                        }
                    }
                }
            }
        }
    }
`;

export const reopenTicket = gql`
    mutation reopenTicket($guildId: String!, $ticketId: String!) {
        reopenTicket(guildId: $guildId, ticketId: $ticketId) {
            _id,
            tickets {
                users
            },
            settings {
                permission {
                    user {
                        manageChannels,
                        sendMessages,
                        manageMessages,
                        embedLinks,
                        attachFiles,
                        addReactions
                    }
                },
                moderatorMessage {
                    reopen {
                        color,
                        author {
                            name,
                            icon
                        },
                        thumbnail,
                        title,
                        description,
                        fields {
                            name,
                            value
                        },
                        footer {
                            text,
                            icon
                        }
                    }
                }
            }
        }
    }
`;