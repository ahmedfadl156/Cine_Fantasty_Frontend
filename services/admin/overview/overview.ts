const API_URL=process.env.NEXT_PUBLIC_API_URL;

export const getOverviewData = async () => {
    const response = await fetch(`${API_URL}/dashboard/get-dashboard-data` , {
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard data");
    }

    const Overview = await response.json();
    return Overview;
}