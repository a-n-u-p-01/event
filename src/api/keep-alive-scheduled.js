
export default async function handler(req, res) {
  const backendUrl = 'https://event-managment-backend-bn7q.onrender.com/health-check'; 
  try {
      const response = await fetch(backendUrl);
      if (response.ok) {
          console.log('Backend is up and running');
      } else {
          console.log('Backend might be down');
      }
  } catch (error) {
      console.log('Error pinging backend:', error);
  }

  
}
