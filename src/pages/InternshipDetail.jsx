import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../src/supabaseClient'; // replace with your Supabase client import
import Navbar from "../components/Navbar";

function InternshipDetail() {
  const { intId } = useParams();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      const { data, error } = await supabase
        .from('internship')
        .select('*')
        .eq('intId', intId)
        .single();

      if (error) {
        console.error('Error fetching internship:', error);
      } else {
        setInternship(data);
      }
    };

    fetchInternship();
  }, [intId]);

  if (!internship) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
      <div className="min-h-screen">
        <div class=" flex justify-center border">
          <div className="flex flex-col items-start mt-6 border">
            <div className="flex justify-between items-center w-full mt-4 border">
              <h1 className="text-4xl font-bold">{internship.companyName}</h1>
              </div>
              </div>
              </div>
              </div>
    </>
  );
}

export default InternshipDetail;