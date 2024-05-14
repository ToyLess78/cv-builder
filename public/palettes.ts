import TemplateConstants from '../src/libs/constants/template.constants';

const strongPalette = [
    'rgba(96, 96, 96, 1)',
    'rgba(86, 96, 193, 1)',
    'rgba(79, 111, 82, 1)',
    'rgba(75, 136, 193, 1)',
    'rgba(119, 136, 153, 1)',
    'rgba(68, 160, 22, 1)',
    'rgba(53, 110, 135, 1)',
    'rgba(74, 57, 135, 1)',
    'rgba(193, 177, 75, 1)',
    'rgba(105, 79, 111, 1)'
];

export const breezePalette = [
    'rgba(25, 118, 210, 1)',
    'rgba(18, 108, 147, 1)',
    'rgba(183, 20, 147, 1)',
    'rgba(99, 147, 18, 1)',
    'rgba(147, 18, 87, 1)',
    'rgba(210, 185, 25, 1)',
    'rgba(13, 170, 186, 1)',
    'rgba(100, 18, 147, 1)',
    'rgba(210, 111, 25, 1)',
    'rgba(119, 136, 153, 1)'
];

const accentPalette = [
    'rgba(234, 187, 70, 1)',
    'rgba(164, 145, 49, 1)',
    'rgba(202, 219, 9, 1)',
    'rgba(132, 164, 49, 1)',
    'rgba(96, 115, 34, 1)',
    'rgba(144, 49, 164, 1)',
    'rgba(101, 34, 115, 1)',
    'rgba(153, 10, 67, 1)',
    'rgba(49, 143, 164, 1)',
    'rgba(91, 49, 164, 1)'
];

const palettesMap = new Map();
palettesMap.set(TemplateConstants.Strong, strongPalette);
palettesMap.set(TemplateConstants.Breeze, breezePalette);
palettesMap.set(TemplateConstants.Accent, accentPalette);

export default palettesMap;