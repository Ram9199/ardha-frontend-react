import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 20px;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.color || 'white'};
  border: 2px solid ${props => props.borderColor || props.color || 'white'};
`;

const planetEmojis = {
  'Sun': '☉',
  'Moon': '☽',
  'Mercury': '☿',
  'Venus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Rahu': '☊',
  'Ketu': '☋'
};

const planetColors = {
  'Sun': { bg: 'rgba(255, 152, 0, 0.6)', border: '#ff9800' },
  'Moon': { bg: 'rgba(158, 158, 158, 0.6)', border: '#9e9e9e' },
  'Mercury': { bg: 'rgba(76, 175, 80, 0.6)', border: '#4caf50' },
  'Venus': { bg: 'rgba(233, 30, 99, 0.6)', border: '#e91e63' },
  'Mars': { bg: 'rgba(244, 67, 54, 0.6)', border: '#f44336' },
  'Jupiter': { bg: 'rgba(103, 58, 183, 0.6)', border: '#673ab7' },
  'Saturn': { bg: 'rgba(33, 150, 243, 0.6)', border: '#2196f3' },
  'Rahu': { bg: 'rgba(0, 0, 0, 0.6)', border: '#212121' },
  'Ketu': { bg: 'rgba(121, 85, 72, 0.6)', border: '#795548' }
};

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const ChartWheel = ({ chartData }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const astroStyle = chartData?.astro_style || 'vedic-north';

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const width = svgRef.current.clientWidth;
        setDimensions({ width, height: width });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!chartData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const radius = Math.min(width, height) / 2 - 15;
    const centerX = width / 2;
    const centerY = height / 2;

    // Define filters first
    const defs = svg.append('defs');
    
    // Add glow effect filter for planets
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'blur');
    
    filter.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');
    
    // Create gradient for center circle
    const gradient = defs.append('linearGradient')
      .attr('id', 'mysticGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    
    // Use different color schemes based on astrology style
    if (astroStyle === 'western') {
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#2196F3');
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#0D47A1');
    } else if (astroStyle === 'kp') {
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#FF5722');
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#BF360C');
    } else { // Default Vedic colors
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#673ab7');
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#311b92');
    }

    // Create outer circle (chart boundary)
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius)
      .attr('fill', '#f5f0ff')
      .attr('stroke', '#673ab7')
      .attr('stroke-width', 15);

    // Create inner circle (white background)
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius * 0.75)
      .attr('fill', 'white')
      .attr('stroke', 'rgba(0,0,0,0.1)')
      .attr('stroke-width', 1);

    // Create center circle with ascendant
    const centerCircle = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);
    
    // Create a more elegant center design with better styling
    centerCircle.append('circle')
      .attr('r', radius * 0.38)
      .attr('fill', 'url(#mysticGradient)')
      .attr('stroke', 'rgba(255,255,255,0.5)')
      .attr('stroke-width', 2);
    
    // Add symbol for ascendant sign
    const getSignSymbol = (sign) => {
      const symbols = {
        'Aries': '♈',
        'Taurus': '♉',
        'Gemini': '♊',
        'Cancer': '♋',
        'Leo': '♌',
        'Virgo': '♍',
        'Libra': '♎',
        'Scorpio': '♏',
        'Sagittarius': '♐',
        'Capricorn': '♑',
        'Aquarius': '♒',
        'Pisces': '♓'
      };
      return symbols[sign] || '';
    };
    
    // Add sign symbol above the name
    centerCircle.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('fill', 'white')
      .attr('font-size', radius * 0.18)
      .attr('font-weight', 'normal')
      .text(getSignSymbol(chartData.lagna.rashi.name));
    
    // Add sign name with better styling
    centerCircle.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.8em')
      .attr('fill', 'white')
      .attr('font-size', radius * 0.09)
      .attr('font-weight', 'bold')
      .text(chartData.lagna.rashi.name);
    
    // Add small "Ascendant" label underneath
    centerCircle.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2em')
      .attr('fill', 'white')
      .attr('font-size', radius * 0.06)
      .attr('font-weight', 'normal')
      .text('Ascendant');

    // Draw zodiac divisions with colored sections based on elements
    const zodiacArc = d3.arc()
      .innerRadius(radius * 0.75)
      .outerRadius(radius)
      .startAngle(d => (d * 30 * Math.PI) / 180)
      .endAngle(d => ((d + 1) * 30 * Math.PI) / 180);
    
    // Colors for different elements (Fire, Earth, Air, Water)
    const elementColors = [
      'rgba(255, 89, 94, 0.1)',  // Fire (Aries, Leo, Sagittarius) - reddish
      'rgba(138, 201, 38, 0.1)', // Earth (Taurus, Virgo, Capricorn) - greenish
      'rgba(255, 209, 102, 0.1)', // Air (Gemini, Libra, Aquarius) - yellowish
      'rgba(25, 130, 196, 0.1)'  // Water (Cancer, Scorpio, Pisces) - bluish
    ];
    
    // Map signs to their elements (0=Fire, 1=Earth, 2=Air, 3=Water)
    const signElementMap = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]; // Aries to Pisces
    
    // Draw the colored segments
    for (let i = 0; i < 12; i++) {
      svg.append('path')
        .attr('d', zodiacArc(i))
        .attr('transform', `translate(${centerX}, ${centerY})`)
        .attr('fill', elementColors[signElementMap[i]])
        .attr('stroke', 'rgba(0,0,0,0.1)')
        .attr('stroke-width', 0.5);
    }

    // Then draw the division lines on top
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = centerX + (radius * 0.75) * Math.cos(angle);
      const y1 = centerY + (radius * 0.75) * Math.sin(angle);
      const x2 = centerX + radius * Math.cos(angle);
      const y2 = centerY + radius * Math.sin(angle);

      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'rgba(0,0,0,0.1)')
        .attr('stroke-width', 1);
    }

    // Add planets to wheel
    Object.entries(chartData.planets).forEach(([planet, data]) => {
      if (!planetColors[planet]) return;

      // Adjust position calculation based on astrology style
      let angle, distance;
      
      if (astroStyle === 'vedic-south') {
        // South Indian style calculates positions based on house placement
        const lagnaIndex = zodiacSigns.indexOf(chartData.lagna.rashi.name);
        const planetIndex = zodiacSigns.indexOf(data.rashi.name);
        if (lagnaIndex === -1 || planetIndex === -1) return;
        
        const houseDegree = ((planetIndex - lagnaIndex + 12) % 12) * 30 + 15;
        angle = (houseDegree - 90) * (Math.PI / 180);
      } else if (astroStyle === 'western' || astroStyle === 'kp') {
        // Western and KP styles position planets relative to the Ascendant at 9 o'clock
        const lagnaLongitude = chartData.lagna.longitude;
        const relativeLongitude = (data.longitude - lagnaLongitude + 360) % 360;
        angle = ((relativeLongitude + 270) % 360) * (Math.PI / 180);
      } else {
        // Default North Indian style - from 0° at 3 o'clock, moving counterclockwise
        angle = ((data.longitude - 90) * Math.PI) / 180;
      }
      
      // Vary distances to prevent overlap
      const distanceFactor = {
        'Sun': 0.50,
        'Moon': 0.57,
        'Mercury': 0.64,
        'Venus': 0.52,
        'Mars': 0.69,
        'Jupiter': 0.61,
        'Saturn': 0.66,
        'Rahu': 0.73,
        'Ketu': 0.55
      };
      
      distance = radius * (distanceFactor[planet] || 0.6);
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      const planetGroup = svg.append('g')
        .attr('transform', `translate(${centerX + x}, ${centerY + y})`)
        .attr('class', 'planet')
        .style('cursor', 'pointer');
      
      planetGroup.append('circle')
        .attr('r', radius * 0.05)
        .attr('fill', planetColors[planet].bg)
        .attr('stroke', planetColors[planet].border)
        .attr('stroke-width', 2)
        .attr('filter', 'url(#glow)');
      
      planetGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('fill', '#333')
        .attr('font-size', radius * 0.07)
        .attr('font-weight', 'bold')
        .text(planetEmojis[planet] || planet[0]);

      // Add a tooltip on hover
      const tooltip = planetGroup.append('g')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .attr('transform', `translate(0, ${-radius * 0.15})`);
      
      tooltip.append('rect')
        .attr('x', -radius * 0.2)
        .attr('y', -radius * 0.08)
        .attr('width', radius * 0.4)
        .attr('height', radius * 0.08)
        .attr('rx', 5)
        .attr('fill', 'rgba(0,0,0,0.8)')
        .attr('stroke', 'rgba(255,255,255,0.3)')
        .attr('stroke-width', 1);
      
      tooltip.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.2em')
        .attr('fill', 'white')
        .attr('font-size', radius * 0.033)
        .text(`${planet} ${data.longitude.toFixed(1)}° ${data.rashi.name}`);
      
      // Add hover interactions
      planetGroup
        .on('mouseover', function() {
          d3.select(this).select('.tooltip')
            .transition()
            .duration(200)
            .style('opacity', 1);
          
          d3.select(this).select('circle')
            .transition()
            .duration(200)
            .attr('r', radius * 0.065);
        })
        .on('mouseout', function() {
          d3.select(this).select('.tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0);
          
          d3.select(this).select('circle')
            .transition()
            .duration(200)
            .attr('r', radius * 0.05);
        });
    });
    
    // Add zodiac sign labels with proper symbols
    for (let i = 0; i < 12; i++) {
      const symbolAngle = ((i * 30 + 15 - 90) * Math.PI) / 180;
      const symbolDistance = radius * 0.87;
      const symbolX = centerX + symbolDistance * Math.cos(symbolAngle);
      const symbolY = centerY + symbolDistance * Math.sin(symbolAngle);
      
      svg.append('circle')
        .attr('cx', symbolX)
        .attr('cy', symbolY)
        .attr('r', radius * 0.035)
        .attr('fill', 'rgba(255,255,255,0.7)');
      
      svg.append('text')
        .attr('x', symbolX)
        .attr('y', symbolY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', radius * 0.045)
        .attr('fill', '#512da8')
        .attr('font-weight', 'bold')
        .text(getSignSymbol(zodiacSigns[i]));
    }
    
    // Add style indicator at the bottom of the chart
    const styleNames = {
      'vedic-north': 'Vedic (North Indian)',
      'vedic-south': 'Vedic (South Indian)',
      'kp': 'KP System',
      'western': 'Western'
    };
    
    svg.append('text')
      .attr('x', centerX)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', radius * 0.06)
      .attr('fill', '#666')
      .attr('font-style', 'italic')
      .text(styleNames[astroStyle] || 'Vedic Style');

  }, [chartData, dimensions, astroStyle]);

  return (
    <>
      <ChartContainer>
        <ChartSvg
          ref={svgRef}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        />
      </ChartContainer>
      <ChartLegend>
        {Object.entries(planetColors).map(([planet, colors]) => (
          <LegendItem key={planet}>
            <LegendColor color={colors.bg} borderColor={colors.border} />
            <span>{planetEmojis[planet] || ''} {planet}</span>
          </LegendItem>
        ))}
      </ChartLegend>
    </>
  );
};

export default ChartWheel; 