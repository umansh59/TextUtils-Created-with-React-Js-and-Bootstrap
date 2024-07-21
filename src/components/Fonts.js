import React, { useState, useEffect } from 'react';

const Fonts = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('regular');
  const [selectedFontInfo, setSelectedFontInfo] = useState(null);
  const [customText, setCustomText] = useState('This is a custom text');

  useEffect(() => {
    // Fetch fonts from the Google Fonts API
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const fontFamilies = data.items.map((font) => font.family);
        setFonts(fontFamilies);
      })
      .catch(error => {
        console.error('Error fetching fonts:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch font data for the selected font when it changes
    if (selectedFont) {
      fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API}&family=${selectedFont}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const fontInfo = data.items.find(item => item.family === selectedFont);
          setSelectedFontInfo(fontInfo);
        })
        .catch(error => {
          console.error('Error fetching font data:', error);
        });
    }
  }, [selectedFont]);

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    setSelectedVariant('regular');
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleCustomTextChange = (event) => {
    setCustomText(event.target.value);
  };

  const variantStyle = {
    fontFamily: selectedFont,
    fontWeight: selectedVariant.includes('italic') ? selectedVariant.replace('italic', '') : selectedVariant,
    fontStyle: selectedVariant.includes('italic') ? 'italic' : 'normal',
  };

  return (
    <div>
      <h1>Google Fonts Loader</h1>
      <select className="form-select" onChange={handleFontChange}>
        <option value="">Select a font</option>
        {fonts.map((font, index) => (
          <option key={index} value={font}>
            {font}
          </option>
        ))}
      </select>
      <br />
      {selectedFont && selectedFontInfo && (
        <div>
          <select className="form-select" onChange={handleVariantChange}>
            {selectedFontInfo.variants.map((variant, index) => (
              <option key={index} value={variant}>
                {variant}
              </option>
            ))}
          </select>
          <br />
          <textarea
            style={{
              fontFamily: selectedFont,
              fontSize: '16px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              color: 'black',
              backgroundColor: 'white',
              height: '300px',
              width: '800px',
            }}
            value={customText}
            onChange={handleCustomTextChange}
            placeholder="Enter custom text"
          />
          <div className="font-cards">
            <div className="font-card">
              <p style={variantStyle}>
                Preview: This is the selected font with the {selectedVariant} variant.
              </p>
              <p className="font-name">Font: {selectedFont}</p>
              <p className="font-variant">Selected Variant: {selectedVariant}</p>
            </div>
          </div>
          <h3>Final Result:</h3>
          <div style={variantStyle}>
            <p>{customText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fonts;
