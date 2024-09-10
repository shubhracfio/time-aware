'use server'

export async function updateFilter(formData) {
  const dateFrom = formData.get('date_from');
  const dateTo = formData.get('date_to');
  
  // Process the data here
  console.log('Date From:', dateFrom);
  console.log('Date To:', dateTo);

  // You can perform any server-side operations here
  // For example, fetching data based on the date range

  // Return or redirect as needed
  // For now, we'll just return the submitted data
  return { dateFrom, dateTo };
}