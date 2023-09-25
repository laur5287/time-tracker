import { getUserSession } from '@/lib/auth'
import Image from 'next/image'

export default async function ProfilePage() {
    const user = await getUserSession()

    return (
        <div>
            <div className="flex">
                <div className="flex flex-col flex-grow gap-4">
                    <h1 className="mb-4 text-3xl">Profile</h1>
                    <h2 className="font-semibold">Details</h2>
                    <div>
                        <div className="font-semibold">Name</div>
                        <div>{user.name}</div>
                    </div>
                    <div>
                        <div className="font-semibold">email</div>
                        <div>{user.email}</div>
                    </div>
                </div>
                <div className="w-[150px]">
                    <Image
                        className="rounded-full"
                        alt="Profile Picture"
                        src={user.image || ''}
                        width={150}
                        height={150}
                    />
                    <span className="text-xs text-neutral-600">
                        If you&apos;d like to change your profile picture, you can edit it
                        on{' '}
                        <a
                            className="text-blue-500 hover:text-blue-600"
                            href="https://myaccount.google.com/profile/photo/edit"
                            target="_blank"
                        >
                            Google here.
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}