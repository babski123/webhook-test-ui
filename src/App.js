import './App.css';
import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, StackDivider, Container, HStack, Heading, TableCaption, Button } from '@chakra-ui/react';
import { getWorkers } from './services/getWorkers';
import { subscriber } from './services/subscriber';

function App() {
  const [workers, setWorkers] = useState([]);
  const [isSubscriberActive, setIsSubscriberActive] = useState(false);

  useEffect(() => {
    // Function to fetch workers and update state
    const fetchWorkers = async () => {
      try {
        const workersData = await getWorkers();
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    // Call fetchWorkers initially
    fetchWorkers();

    // Setup interval to fetch workers every 10 seconds
    const intervalId = setInterval(fetchWorkers, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to only run effect once on mount

  useEffect(() => {
    let intervalId;
    if (isSubscriberActive) {
      // Setup interval to call subscriber every 30 seconds
      intervalId = setInterval(subscriber, 30000);
    } else {
      // Clear interval when subscriber is deactivated
      clearInterval(intervalId);
    }

    // Cleanup interval on component unmount or when subscriber is deactivated
    return () => clearInterval(intervalId);
  }, [isSubscriberActive]);

  const handleToggleSubscriber = () => {
    setIsSubscriberActive(prevState => !prevState);
  };

  return (
    <HStack divider={<StackDivider borderColor="gray.200" />}>
      <Container maxWidth="60%">
        <Heading mt="1em" textAlign="center">
          Example App
        </Heading>
        <TableContainer mt="3em">
          <Table size="sm" variant="striped">
            <TableCaption placement="top">
              Workers List
            </TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Public ID</Th>
                <Th textAlign="center">First name</Th>
                <Th textAlign="center">Last name</Th>
                <Th textAlign="center">DOB</Th>
                <Th textAlign="center">Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                workers.map((item, index) => (
                  <Tr key={item.publicId + "_" + index}>
                    <Td textAlign="center">{item.publicId}</Td>
                    <Td textAlign="center">{item.firstName}</Td>
                    <Td textAlign="center">{item.lastName}</Td>
                    <Td textAlign="center">{item.dob}</Td>
                    <Td textAlign="center">{item.email}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      <Container centerContent width="30%">
        <Heading mt="1em" textAlign="center">
          Scheduler
        </Heading>
        <Button onClick={handleToggleSubscriber} mt="1em">
          {isSubscriberActive ? 'Deactivate Scheduler' : 'Activate Scheduler'}
        </Button>
      </Container>
    </HStack>
  );
}

export default App;