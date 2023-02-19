export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Attachment = {
	__typename?: 'Attachment';
	description: Scalars['String'];
	name: Scalars['String'];
	url: Scalars['String'];
};

export type Author = {
	__typename?: 'Author';
	icon?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
};

export type AutoRoleSettings = {
	__typename?: 'AutoRoleSettings';
	enabled: Scalars['Boolean'];
	role?: Maybe<Scalars['String']>;
};

export enum ChannelPermission {
	Neutral = 'NEUTRAL',
	None = 'NONE',
	Yes = 'YES'
}

export type Command = {
	__typename?: 'Command';
	category?: Maybe<Scalars['String']>;
	description: Scalars['String'];
	enabled: Scalars['Boolean'];
	name: Scalars['String'];
};

export type Embed = {
	__typename?: 'Embed';
	author?: Maybe<Author>;
	color?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fields?: Maybe<Array<Maybe<Field>>>;
	footer?: Maybe<Footer>;
	thumbnail?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
};

export type Field = {
	__typename?: 'Field';
	name?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type Footer = {
	__typename?: 'Footer';
	icon?: Maybe<Scalars['String']>;
	text?: Maybe<Scalars['String']>;
};

export type GoodbyeSettings = {
	__typename?: 'GoodbyeSettings';
	channel?: Maybe<Scalars['String']>;
	embed?: Maybe<Embed>;
	enabled: Scalars['Boolean'];
	isEmbed?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};

export type Guild = {
	__typename?: 'Guild';
	_id: Scalars['String'];
	language: Scalars['String'];
	members: Array<Maybe<Member>>;
	settings: Settings;
};

export enum LevelMessageType {
	Channel = 'CHANNEL',
	Custom = 'CUSTOM',
	Disable = 'DISABLE',
	Dm = 'DM'
}

export type LevelSettings = {
	__typename?: 'LevelSettings';
	channel?: Maybe<Scalars['String']>;
	enabled: Scalars['Boolean'];
	message?: Maybe<Scalars['String']>;
	type?: Maybe<LevelMessageType>;
};

export type LogsEvents = {
	__typename?: 'LogsEvents';
	channelCreate: Scalars['Boolean'];
	channelDelete: Scalars['Boolean'];
	channelUpdate: Scalars['Boolean'];
	emojiCreate: Scalars['Boolean'];
	emojiDelete: Scalars['Boolean'];
	emojiUpdate: Scalars['Boolean'];
	guildBanAdd: Scalars['Boolean'];
	guildBanRemove: Scalars['Boolean'];
	guildMemberAdd: Scalars['Boolean'];
	guildMemberRemove: Scalars['Boolean'];
	guildMemberUpdate: Scalars['Boolean'];
	inviteCreate: Scalars['Boolean'];
	inviteDelete: Scalars['Boolean'];
	messageDelete: Scalars['Boolean'];
	messageDeleteBulk: Scalars['Boolean'];
	messageUpdate: Scalars['Boolean'];
	roleCreate: Scalars['Boolean'];
	roleDelete: Scalars['Boolean'];
	roleUpdate: Scalars['Boolean'];
	stickerCreate: Scalars['Boolean'];
	stickerDelete: Scalars['Boolean'];
	stickerUpdate: Scalars['Boolean'];
	threadCreate: Scalars['Boolean'];
	threadDelete: Scalars['Boolean'];
	threadUpdate: Scalars['Boolean'];
};

export type LogsSettings = {
	__typename?: 'LogsSettings';
	channel?: Maybe<Scalars['String']>;
	enabled: Scalars['Boolean'];
	events: LogsEvents;
};

export type Member = {
	__typename?: 'Member';
	_id: Scalars['String'];
	cardColor: Scalars['String'];
	experience: Scalars['Int'];
	level: Scalars['Int'];
	messages: Scalars['Int'];
};

export type ModerationSettings = {
	__typename?: 'ModerationSettings';
	enabled: Scalars['Boolean'];
};

export type Mutation = {
	__typename?: 'Mutation';
	closeTicket: TicketPanel;
	createGuild: Guild;
	createMember: Member;
	createTicket?: Maybe<Ticket>;
	createTicketPanel: Scalars['Boolean'];
	incMemberMessage: RankMember;
	sendTicketPanel: Scalars['Boolean'];
};


export type MutationCloseTicketArgs = {
	guildId: Scalars['String'];
	ticketId: Scalars['String'];
};


export type MutationCreateGuildArgs = {
	id: Scalars['String'];
};


export type MutationCreateMemberArgs = {
	guildId: Scalars['String'];
	memberId: Scalars['String'];
};


export type MutationCreateTicketArgs = {
	authorId: Scalars['String'];
	authorName: Scalars['String'];
	guildId: Scalars['String'];
	panelId: Scalars['String'];
};


export type MutationCreateTicketPanelArgs = {
	guildId: Scalars['String'];
	name: Scalars['String'];
};


export type MutationIncMemberMessageArgs = {
	guildId: Scalars['String'];
	memberId: Scalars['String'];
};


export type MutationSendTicketPanelArgs = {
	channelId: Scalars['String'];
	guildId: Scalars['String'];
	panelId: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	guild: Guild;
	guilds: Array<Maybe<Guild>>;
	member?: Maybe<Member>;
	members?: Maybe<Array<Maybe<Member>>>;
	ticketPanel?: Maybe<TicketPanel>;
	ticketPanels?: Maybe<Array<Maybe<TicketPanel>>>;
};


export type QueryGuildArgs = {
	id: Scalars['String'];
};


export type QueryMemberArgs = {
	guildId: Scalars['String'];
	memberId: Scalars['String'];
};


export type QueryMembersArgs = {
	guildId: Scalars['String'];
};


export type QueryTicketPanelArgs = {
	guildId: Scalars['String'];
	panelId: Scalars['String'];
};


export type QueryTicketPanelsArgs = {
	guildId: Scalars['String'];
};

export type RankMember = {
	__typename?: 'RankMember';
	_id: Scalars['String'];
	cardColor: Scalars['String'];
	experience: Scalars['Int'];
	level: Scalars['Int'];
	oldLevel: Scalars['Int'];
};

export type Settings = {
	__typename?: 'Settings';
	autoRole: AutoRoleSettings;
	goodbye: GoodbyeSettings;
	levels: LevelSettings;
	logs: LogsSettings;
	moderation: ModerationSettings;
	tickets: TicketSettings;
	welcome: WelcomeSettings;
};

export type Ticket = {
	__typename?: 'Ticket';
	_id: Scalars['ID'];
	author: TicketAuthor;
	closedAt?: Maybe<Scalars['Int']>;
	createdAt: Scalars['Int'];
	guildId: Scalars['String'];
	messages: Array<Maybe<TicketMessage>>;
	name: Scalars['String'];
	users: Array<Maybe<Scalars['String']>>;
};

export type TicketAuthor = {
	__typename?: 'TicketAuthor';
	_id: Scalars['String'];
	username: Scalars['String'];
};

export type TicketButtonSettings = {
	__typename?: 'TicketButtonSettings';
	emoji: Scalars['String'];
	enabled: Scalars['Boolean'];
	label?: Maybe<Scalars['String']>;
};

export type TicketMessage = {
	__typename?: 'TicketMessage';
	_id: Scalars['String'];
	attachments?: Maybe<Array<Maybe<Attachment>>>;
	author: TicketAuthor;
	createdAt: Scalars['Int'];
	deletedAt?: Maybe<Scalars['Int']>;
	text?: Maybe<Scalars['String']>;
};

export type TicketPanel = {
	__typename?: 'TicketPanel';
	_id: Scalars['ID'];
	guildId: Scalars['String'];
	name: Scalars['String'];
	settings: TicketPanelSettings;
	tickets: Array<Maybe<Ticket>>;
};

export type TicketPanelButtonSettings = {
	__typename?: 'TicketPanelButtonSettings';
	close: TicketButtonSettings;
	confirmClose: TicketButtonSettings;
	create: TicketButtonSettings;
	delete: TicketButtonSettings;
	reopen: TicketButtonSettings;
};

export type TicketPanelCategorySettings = {
	__typename?: 'TicketPanelCategorySettings';
	closed?: Maybe<Scalars['String']>;
	open?: Maybe<Scalars['String']>;
};

export type TicketPanelGeneralSettings = {
	__typename?: 'TicketPanelGeneralSettings';
	limitPerUser: Scalars['Int'];
	supportRoles: Array<Maybe<Scalars['String']>>;
};

export type TicketPanelMessageSettings = {
	__typename?: 'TicketPanelMessageSettings';
	closed: Embed;
	open: Embed;
};

export type TicketPanelModeratorMessageSettings = {
	__typename?: 'TicketPanelModeratorMessageSettings';
	close: Embed;
	delete: Embed;
	reopen: Embed;
};

export type TicketPanelPanelSettings = {
	__typename?: 'TicketPanelPanelSettings';
	message: Embed;
};

export type TicketPanelPermissionSettings = {
	__typename?: 'TicketPanelPermissionSettings';
	support: TicketPermission;
	user: TicketPermission;
};

export type TicketPanelSettings = {
	__typename?: 'TicketPanelSettings';
	button: TicketPanelButtonSettings;
	category: TicketPanelCategorySettings;
	general: TicketPanelGeneralSettings;
	message: TicketPanelMessageSettings;
	moderatorMessage: TicketPanelModeratorMessageSettings;
	panel: TicketPanelPanelSettings;
	permission: TicketPanelPermissionSettings;
};

export type TicketPermission = {
	__typename?: 'TicketPermission';
	addReactions: ChannelPermission;
	attachFiles: ChannelPermission;
	embedLinks: ChannelPermission;
	manageChannels: ChannelPermission;
	manageMessages: ChannelPermission;
	readMessages: ChannelPermission;
	sendMessages: ChannelPermission;
};

export type TicketSettings = {
	__typename?: 'TicketSettings';
	enabled: Scalars['Boolean'];
};

export type WelcomeSettings = {
	__typename?: 'WelcomeSettings';
	channel?: Maybe<Scalars['String']>;
	embed?: Maybe<Embed>;
	enabled: Scalars['Boolean'];
	isEmbed?: Maybe<Scalars['Boolean']>;
	message?: Maybe<Scalars['String']>;
};
