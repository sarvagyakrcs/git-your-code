import React, { Suspense } from 'react';
import NewVerificationForm from './_components/new-verification-form';

const Page = () => {
	return (
		<div className="flex items-center justify-center min-h-full min-w-full">
		    <Suspense fallback={<div>Loading...</div>}>
				<NewVerificationForm />
		    </Suspense>
		</div>
	)
}

export default Page;