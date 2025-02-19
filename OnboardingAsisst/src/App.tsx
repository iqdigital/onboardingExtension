import './App.css'
import { useState } from 'react';
function App() {
  const [message, setMessage] = useState('');


  const checkAlignAd = async () => {
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id !== undefined) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const alignAd = document.querySelector('#iqd_align_Ad');
          if (!alignAd) {
            return 'No Align Ad found';
          }
          const alignAdWidth = alignAd.getBoundingClientRect().width;
          const leftMargin = alignAd.getBoundingClientRect().left;
          const alignAdRight = alignAd.getBoundingClientRect().right;
          const rightMargin = window.innerWidth - alignAdRight;

          if (leftMargin === rightMargin) {
            return (`Align Ad is centered. Align Ad Width: ${alignAdWidth}px`);
          } else {
            let misAlignedValue;
            let message;
            if (leftMargin > rightMargin) {
              misAlignedValue = leftMargin - rightMargin;
              message = `Align Ad is not centered. Misalignment to the right: ${misAlignedValue}px`;
            } else {
              misAlignedValue = rightMargin - leftMargin;
              message = `Align Ad is not centered. Misalignment to the left: ${misAlignedValue}px`;
            }
            return message;
          }
        },
      }, (results) => {
        if (results && results[0] && results[0].result !== undefined) {
          setMessage(results[0].result);
        }
      });
    }
  }


  const toggleBackground = async () => {
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.id !== undefined) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const currentColor = document.body.style.backgroundColor;
          if (currentColor === 'red') {
            document.body.style.backgroundColor = '';
            return 'Background reset to default';
          } else {
            document.body.style.backgroundColor = 'red';
            return 'Background changed to red';
          }
        }
      }, (results) => {
        if (results && results[0] && results[0].result !== undefined) {
          setMessage(results[0].result);
        }
      });
    }
  }

  return (
    <>
      <h1>OnboardingAsisstant</h1>

      <button onClick={checkAlignAd}>Check AlignAd</button>
      <button onClick={toggleBackground}>Toggle Background</button>
      
      {message && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '12px',
          backgroundColor: '#f3f4f6',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          color: '#374151',
          textAlign: 'center',
          fontSize: '16px'
        }}>
          {message}
        </div>
      )}
      <p className="read-the-docs">
        Click hier to learn more
      </p>
    </>
  )
}

export default App
