import * as bcrypt from 'bcryptjs';

export class Utils {
	public hashPassword(password: string) {
		return bcrypt.hashSync(password, 8);
	}

	public checkIfUnencryptedPasswordIsValid(
		unencryptedPassword: string,
		password: string
	) {
		return bcrypt.compareSync(unencryptedPassword, password);
	}
}
