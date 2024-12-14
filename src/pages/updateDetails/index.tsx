import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Heading from "@/components/Reusable/heading";
import { useToast } from "@/hooks/use-toast";
import StudentNav from "@/components/student/studentNav";
import { useRouter } from "next/router";

export default function DetailsPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    let route = useRouter();

    const [formData, setFormData] = useState({
        RollNumber: 0,
        Branch: "",
        Year: 0,
        WAContact: "",
        ParentsContact: 0,
        Address: "",
        City: "",
        Father: "",
        Mother: "",
        EmergencyContact: "",
        LocalName: "",
        LocalContact: 0,
        Email: session?.user?.email || "",
    });

    // Fetch existing data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getStudentInfo?email=${session?.user?.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData((prev) => ({
                        ...prev,
                        ...data, // Populate formData with existing user data
                    }));
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        fetchData();
    }, [session?.user?.email]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/studentUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    email: session?.user?.email
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null); // catch to handle missing response body
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: `There was a problem with your request, ${errorData}`,
                })
            
        
            } else {
                toast({
                    variant: "default",
                    className: "bg-main text-white",
                    title: "Your Details are Updated",
                });
                route.push("/allDetails");
            }
        } catch (error) {
            console.error("Failed to update student details:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "A network error occurred. Please try again later.",
            });
        }
    };

    return (
        <div className="bg-white min-h-screen pb-5 md:pb-10 " >
            <StudentNav />
            
            <form onSubmit={handleSubmit} className="  bg-white rounded-lg shadow-md mt-2 md:mt-5 shadow-main p-6 mx-5 md:mx-10">
                <Heading title='Update Details' center subtitle='Here all the details of the student' className='text-main  font-bold' />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div>
                        <Label htmlFor="Name" className="block text-gray-700 font-semibold">Name</Label>
                        <Input
                            id="Name"
                            name="Name"
                            value={session?.user?.name || ""}
                            readOnly
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                   

                    <div>
                        <Label htmlFor="Email" className="block text-gray-700 font-semibold">Email</Label>
                        <Input
                            id="Email"
                            name="Email"
                            value={session?.user?.email || ""}
                            readOnly
                            className="w-full border-main mt-2 p-2 border rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="RollNumber" className="block text-gray-700 font-semibold">Roll Number</Label>
                        <Input
                            id="RollNumber"
                            name="RollNumber"
                            value={formData.RollNumber}
                            onChange={handleChange}
                            placeholder="Roll Number"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="Branch" className="block text-gray-700 font-semibold">Branch</Label>
                        <Input
                            id="Branch"
                            name="Branch"
                            value={formData.Branch}
                            onChange={handleChange}
                            placeholder="Branch"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="Year" className="block text-gray-700 font-semibold">Year</Label>
                        <Input
                            id="Year"
                            name="Year"
                            value={formData.Year}
                            onChange={handleChange}
                            placeholder="Year"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>
                    <div>
                        <Label htmlFor="WAContact" className="block text-gray-700 font-semibold">WhatsApp No.</Label>
                        <Input
                            id="WAContact"
                            name="WAContact"
                            value={formData.WAContact}
                            onChange={handleChange}
                            placeholder="WhatsApp Contact"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>
                    {/* Column 2 */}
                   

                    <div>
                        <Label htmlFor="ParentsContact" className="block text-gray-700 font-semibold">Parents Contact</Label>
                        <Input
                            id="ParentsContact"
                            name="ParentsContact"
                            value={formData.ParentsContact}
                            onChange={handleChange}
                            placeholder="Parent's Contact"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="City" className="block text-gray-700 font-semibold">City</Label>
                        <Input
                            id="City"
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            placeholder="City"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="Father" className="block text-gray-700 font-semibold">Father's Name</Label>
                        <Input
                            id="Father"
                            name="Father"
                            value={formData.Father}
                            onChange={handleChange}
                            placeholder="Father's Name"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="Mother" className="block text-gray-700 font-semibold">Mother's Name</Label>
                        <Input
                            id="Mother"
                            name="Mother"
                            value={formData.Mother}
                            onChange={handleChange}
                            placeholder="Mother's Name"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="EmergencyContact" className="block text-gray-700 font-semibold">Emergency Contact</Label>
                        <Input
                            id="EmergencyContact"
                            name="EmergencyContact"
                            value={formData.EmergencyContact}
                            onChange={handleChange}
                            placeholder="Emergency Contact"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="LocalName" className="block text-gray-700 font-semibold">Local Contact Name</Label>
                        <Input
                            id="LocalName"
                            name="LocalName"
                            value={formData.LocalName}
                            onChange={handleChange}
                            placeholder="Local Contact Name"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <Label htmlFor="LocalContact" className="block text-gray-700 font-semibold">Local Contact Number</Label>
                        <Input
                            id="LocalContact"
                            name="LocalContact"
                            value={formData.LocalContact}
                            onChange={handleChange}
                            placeholder="Local Contact Number"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="Address" className="block text-gray-700 font-semibold">Address</Label>
                        <Input
                            id="Address"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                            className="w-full mt-2 p-2 border border-main rounded focus:outline-none focus:border-main"
                        />
                    </div>
                </div>

                

                <div className="mt-4">
                    <Button type="submit" className="w-full py-2 px-4 bg-main text-white font-semibold rounded hover:bg-blue-700">
                        Submit
                    </Button>
                </div>

                
            </form>
        </div>
    );
}