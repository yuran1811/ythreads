export interface UserProps {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  profileImageUrl: string;
  imageUrl: string;
  gender: string;
  birthday: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: null;
  primaryWeb3WalletId: null;
  lastSignInAt: 1691420729352;
  externalId: null;
  username: 'yuran1811';
  firstName: 'Yuran';
  lastName: 'Legends';
  publicMetadata: {};
  privateMetadata: {};
  unsafeMetadata: {};
  emailAddresses: {
    id: string;
    emailAddress: string;
    verification: any[];
    linkedTo: any[];
  }[];
  phoneNumbers: [];
  web3Wallets: [];
  externalAccounts: UserProps[];
}

export interface UserInfoProps {
  _id: any;
  id: string;
  bio: string;
  communities: any[];
  image: string;
  name: string;
  onboarded: boolean;
  threads: any[];
  username: string;
}
