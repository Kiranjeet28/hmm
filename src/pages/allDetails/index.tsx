import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Reusable/loading';
import Heading from '@/components/Reusable/heading';
import StudentNav from '@/components/student/studentNav';
import Image from 'next/image';
import MessperstdList from '@/components/student/MessSheet';
import { UserInfo } from '@/resources/type/d.index';



export default function AllDetails() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/getStudentInfo?email=${session.user.email}`);
          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setLoading(false);
        }
      }
    };


    fetchUserInfo();
  }, [session]);

  if (loading) {
    return (
      <Loading />
    );
  }


  return (
    <div>
      <StudentNav/>
      <div className="min-h-screen bg-white p-8">
        <div className=" mx-auto bg-white rounded-lg shadow-md shadow-main p-6">
          <Heading title='All Details' center subtitle='Here all the details of the student' className='text-main  font-bold' />

          {userInfo && (
            <div className="space-y-4">
              {session?.user?.image ? (
                <div className="flex w-full justify-center mb-6">
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    className="rounded-full object-cover animate-shimmer bg-[linear-gradient(110deg,#015091,45%,#5bacee,55%,#16446a)] bg-[length:200%_100%] p-2"
                    width={128}
                    height={128}
                  /> 
                </div>
              ) : (
                  <div className="flex w-full justify-center mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg animate-shimmer bg-[linear-gradient(110deg,#015091,45%,#5bacee,55%,#16446a)] bg-[length:200%_100%]">
                  {session?.user?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                </div>
                
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Name</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Name}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Email</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Email}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Roll Number</h2>
                  <p className="text-gray-900 font-medium">{userInfo.RollNumber}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Branch</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Branch}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Year</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Year}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">WhatsApp Contact</h2>
                  <p className="text-gray-900 font-medium">{userInfo.WAContact}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Parents Contact</h2>
                  <p className="text-gray-900 font-medium">{userInfo.ParentsContact}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Address</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Address}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">City</h2>
                  <p className="text-gray-900 font-medium">{userInfo.City}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Father's Name</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Father}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Mother's Name</h2>
                  <p className="text-gray-900 font-medium">{userInfo.Mother}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Emergency Contact</h2>
                  <p className="text-gray-900 font-medium">{userInfo.EmergencyContact}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Local Guardian Name</h2>
                  <p className="text-gray-900 font-medium">{userInfo.LocalName}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-sm text-main  font-bold">Local Contact</h2>
                  <p className="text-gray-900 font-medium">{userInfo.LocalContact}</p>
                </div>
              </div>
              <MessperstdList/>
            </div>
          )}

          {!userInfo && (
            <div className="text-center text-main  font-bold">
              No student information available
            </div>
          )}
        </div>
      </div>
    </div>
  );}
