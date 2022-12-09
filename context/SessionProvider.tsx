'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

type PageProps = {
	children: ReactNode,
	session?: Session,
};

const AuthSessionProvider: FC<PageProps> = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
      			{ children }
    		</SessionProvider>
	);
};

export default AuthSessionProvider;
