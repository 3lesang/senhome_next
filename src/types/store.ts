export type StoreType = {
	id: string;
	name: string;
	description: string;
	email: string;
	phone: string;
	address: string;
	social: any;
	policy: any;
};

export type PolicyType = {
	id: string;
	title: string;
	slug: string;
	content: string;
	created: Date;
};