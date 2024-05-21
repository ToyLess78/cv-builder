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
    'rgba(233, 167, 3, 1)',
    'rgba(164, 145, 49, 1)',
    'rgba(132, 165, 157, 1)',
    'rgba(96, 115, 34, 1)',
    'rgba(157, 129, 137, 1)',
    'rgba(142, 125, 190, 1)',
    'rgba(61, 52, 139, 1)',
    'rgba(114, 0, 38, 1)',
    'rgba(49, 143, 164, 1)',
    'rgba(47, 102, 144, 1)'
];

const advancePalette = [
    'rgba(32, 42, 81, 1)',
    'rgba(22, 38, 57, 1)',
    'rgba(35, 22, 57, 1)',
    'rgba(42, 37, 81, 1)',
    'rgba(50, 32, 81, 1)',
    'rgba(32, 81, 66, 1)',
    'rgba(22, 57, 46, 1)',
    'rgba(81, 78, 32, 1)',
    'rgba(57, 41, 22, 1)',
    'rgba(57, 22, 32, 1)'
];

const headwayPalette = [
    'rgba(22, 38, 57, 1)',
    'rgba(32, 42, 81, 1)',
    'rgba(42, 37, 81, 1)',
    'rgba(32, 81, 66, 1)',
    'rgba(22, 57, 46, 1)',
    'rgba(26, 27, 57, 1)',
    'rgba(40, 15, 27, 1)',
    'rgba(31, 76, 81, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(57, 53, 22, 1)'
];
const successPalette = [
    'rgba(31, 76, 81, 1)',
    'rgba(22, 54, 57, 1)',
    'rgba(32, 43, 81, 1)',
    'rgba(31, 81, 34, 1)',
    'rgba(22, 57, 24, 1)',
    'rgba(81, 31, 66, 1)',
    'rgba(57, 22, 46, 1)',
    'rgba(81, 72, 31, 1)',
    'rgba(39, 37, 81, 1)',
    'rgba(27, 26, 57, 1)'
];

const modernPalette = [
    'rgba(67, 159, 195, 1)',
    'rgba(32, 167, 197, 1)',
    'rgba(47, 123, 136, 1)',
    'rgba(15, 112, 164, 1)',
    'rgba(108, 153, 174, 1)',
    'rgba(2, 48, 71, 1)',
    'rgba(212, 156, 19, 1)',
    'rgba(27, 38, 59, 1)',
    'rgba(65, 90, 119, 1)',
    'rgba(119, 141, 169, 1)',
    'rgba(94, 84, 142, 1)',
];

const palettesMap = new Map();
palettesMap.set(TemplateConstants.Strong, strongPalette);
palettesMap.set(TemplateConstants.Breeze, breezePalette);
palettesMap.set(TemplateConstants.Accent, accentPalette);
palettesMap.set(TemplateConstants.Advance, advancePalette);
palettesMap.set(TemplateConstants.Headway, headwayPalette);
palettesMap.set(TemplateConstants.Success, successPalette);
palettesMap.set(TemplateConstants.Modern, modernPalette);

export default palettesMap;