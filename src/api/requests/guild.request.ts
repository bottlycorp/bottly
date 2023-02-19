import { gql } from 'graphql-request';

export const createGuild = gql`
    mutation createGuild($id: String!) {
        createGuild(id: $id) {
            _id,
            settings {
                logs {
                    enabled
                },
                welcome {
                    enabled
                },
                goodbye {
                    enabled
                },
                autoRole {
                    enabled
                },
                levels {
                    enabled
                },
                moderation {
                    enabled
                }
            }
        }
    }
`;

export const createMember = gql`
    mutation createMember($guildId: String!, $memberId: String!) {
        createMember(guildId: $guildId, memberId: $memberId) {
            _id
        }
    }
`;

export const incMemberMessage = gql`
    mutation incMemberMessage($guildId: String!, $memberId: String!) {
        incMemberMessage(guildId: $guildId, memberId: $memberId) {
            experience,
            level,
            oldLevel
        }
    }
`;

export const getGuildsSettingsEnabled = gql`
    query getGuilds {
        guilds {
            _id,
            settings {
                logs {
                    enabled
                },
                welcome {
                    enabled
                },
                goodbye {
                    enabled
                },
                autoRole {
                    enabled
                },
                levels {
                    enabled
                },
                moderation {
                    enabled
                }
            }
        }
    }
`;

export const getGuildSettingsEnabled = gql`
    query getGuilds($id: String!) {
        guild(id: $id) {
            _id,
            settings {
                logs {
                    enabled
                },
                welcome {
                    enabled
                },
                goodbye {
                    enabled
                },
                autoRole {
                    enabled
                },
                levels {
                    enabled
                },
                moderation {
                    enabled
                }
            }
        }
    }
`;

export const getGuildLevelSettings = gql`
    query getGuild($id: String!) {
        guild(id: $id) {
            settings {
                levels {
                    enabled,
                    type,
                    channel,
                    message
                }
            }
        }
    }
`;

export const getGuildLanguage = gql`
    query getGuildInfos($id: String!) {
        guild(id: $id) {
            language
        }
    }
`;

export const getMemberRank = gql`
    query getMember($guildId: String!, $memberId: String!) {
        member(guildId: $guildId, memberId: $memberId) {
            experience,
            level
        }
    }
`;

export const getMembersRank = gql`
	query getMembers($guildId: String!) {
        members(guildId: $guildId) {
            _id,
            experience,
            level,
            cardColor
		}
	}
`;