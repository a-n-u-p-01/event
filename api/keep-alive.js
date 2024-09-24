
export default async function handler(req, res) {
    const backendUrl = '/health-check'; 
  
    try {
      const response = await fetch(backendUrl);
      if (response.ok) {
        console.log('Backend is up running');
      } else {
        console.log('Backend might be down');
      }
    } catch (error) {
      console.log('Error pinging backend:', error);
    }
  
    res.status(200).json({ status: 'success' });
  }
  