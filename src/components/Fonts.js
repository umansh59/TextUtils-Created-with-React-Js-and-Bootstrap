import React, { useState, useEffect } from 'react';

const Fonts = () => {
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('regular');
  const [selectedFontInfo, setSelectedFontInfo] = useState(null);
  const [customText, setCustomText] = useState('This is a custom text');

  useEffect(() => {
    // Fetch fonts from the Google Fonts API
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY',// enter the api key 
      true
    );

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const fontFamilies = response.items.map((font) => font.family);
        setFonts(fontFamilies);
      } else {
        console.error('Error fetching fonts:', xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.error('Network error while fetching fonts');
    };

    xhr.send();
  }, []);

  useEffect(() => {
    // Fetch font data for the selected font when it changes
    if (selectedFont) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY&family=${selectedFont}`,//enter the api key 
        true
      );

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const fontInfo = response.items[0];
          setSelectedFontInfo(fontInfo);
        } else {
          console.error('Error fetching font data:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('Network error while fetching font data');
      };

      xhr.send();
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
    fontWeight:    selectedVariant === '100' ? '100' :
    selectedVariant === '100italic' ? '100' :
    selectedVariant === '200' ? '200' :
    selectedVariant === '200italic' ? '200' :
    selectedVariant === '300' ? '300' :
    selectedVariant === '300italic' ? '300' :
    selectedVariant === '400' ? 'normal' :
    selectedVariant === '400italic' ? 'italic' :
    selectedVariant === '500' ? '500' :
    selectedVariant === '500italic' ? '500' :
    selectedVariant === '600' ? '600' :
    selectedVariant === '600italic' ? '600' :
    selectedVariant === '700' ? 'bold' :
    selectedVariant === '700italic' ? 'bold' :
    selectedVariant === '800' ? '800' :
    selectedVariant === '800italic' ? '800' :
    selectedVariant === '900' ? '900' :
    selectedVariant === '900italic' ? '900' : 'normal',
    fontStyle: selectedVariant === 'italic' ? 'italic' :
    selectedVariant === '100italic' ? 'italic' :
    selectedVariant === '200italic' ? 'italic' :
    selectedVariant === '300italic' ? 'italic' :
    selectedVariant === '400italic' ? 'italic' :
    selectedVariant === '500italic' ? 'italic' :
    selectedVariant === '600italic' ? 'italic' :
    selectedVariant === '700italic' ? 'italic' :
    selectedVariant === '800italic' ? 'italic' :
    selectedVariant === '900italic' ? 'italic' : 'normal',
    
  };

  return (
    <>
      {/* <div style={variantStyle}>
        <p>{customText}</p>
      </div> */}
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
<br></br>
        {selectedFont && (
          <div>
            

            {selectedFontInfo && (
              <select className="form-select" onChange={handleVariantChange}>
                {selectedFontInfo.variants.map((variant, index) => (
                  <option  key={index} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            )}
<br/><div>
            <textarea
                 style={{
                    fontFamily: selectedFont,
                    fontSize: '16px', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc', 
                    color: 'black',
                    backgroundColor: 'white',
                    height:'300px',
                    width:'800px',
                  }}
              
              value={customText}
              onChange={handleCustomTextChange}
              placeholder="Enter custom text"
            />
</div>
            <div className="font-cards">
              <div className="font-card">
                <p style={variantStyle}>
                 Preview: This is the selected font with the {selectedVariant} variant.
                </p>
                <p className="font-name">Font : {selectedFont}</p>
                <p className="font-variant">Selected Variant: {selectedVariant}</p>
              </div>
            </div>
            <h3>Final Result:</h3>
            <div style={variantStyle}>
              <p><br></br>
              {customText}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Fonts;
