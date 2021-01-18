import mongoose from 'mongoose';
import { Utils } from './../utils/utils';
import { IUser } from './interfaces/user.interface';

const utils = new Utils();

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		login: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{ collection: 'user' }
);

UserSchema.pre<IUser>('save', function (next) {
	if (this.isModified('password')) {
		this.password = utils.hashPassword(this.password);
	}
	next();
});

export const User = mongoose.model('User', UserSchema);
