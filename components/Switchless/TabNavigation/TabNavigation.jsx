
import {Tabs,Tab,TabList,TabPanel,Box,Chip} from '@mui/joy/'
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TabNavigation({ tabData, tabPanels }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const getTabValue = useCallback((label) => 
    label.toLowerCase().replace(/\s+/g, '-'), []);

  const updateUrl = useCallback((newTab) => {
    const newTabValue = getTabValue(tabData[newTab].label);
    const pathParts = pathname.split('/');
    const tabValues = tabData.map(tab => getTabValue(tab.label));
    
    // Find the index of any existing tab value in the path
    const existingTabIndex = pathParts.findIndex(part => tabValues.includes(part));
    
    if (existingTabIndex !== -1) {
      // Replace the existing tab value
      pathParts[existingTabIndex] = newTabValue;
    } else {
      // If no existing tab value, add the new one to the end
      pathParts.push(newTabValue);
    }
    
    const newPath = pathParts.join('/').replace(/\/+/g, '/');
    window.history.pushState(null, '', newPath);
  }, [pathname, tabData, getTabValue]);

  useEffect(() => {
    const tabIndex = tabData.findIndex(tab => 
      pathname.includes(getTabValue(tab.label))
    );
    
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    } else {
      updateUrl(0);
      setActiveTab(0);
    }
  }, [pathname, tabData, getTabValue, updateUrl]);

  const onTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
    updateUrl(newValue);
  }, [updateUrl]);

  return (
    <Box sx={{
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitScrollbar: { display: 'none' },
        }}>
    <Tabs  defaultValue={0}
     value={activeTab}
     onChange={onTabChange}
     sx={{
          backgroundColor: 'white', 
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          scrollSnapAlign: 'start',
          '& .MuiTab-root': {
            backgroundColor: 'transparent' ,
             '&.Mui-selected': {
              backgroundColor: 'transparent',
              minWidth: 'auto',
          }},
     }}>
      <TabList tabFlex="auto">
      {tabData.map((tab, index) => (
          <Tab key={index}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              color: 'black',
            }}>
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <Chip size="sm" variant="outlined" color="neutral">
                  {tab.count}
                </Chip>
              )}
            </Box>
          </Tab>
        ))}
      </TabList>
      {Object.entries(tabPanels).map(([key, Component], index) => (
        <TabPanel key={key} value={index}>
          <Component />
        </TabPanel>
      ))}
    </Tabs>
    </Box>
  );
}
