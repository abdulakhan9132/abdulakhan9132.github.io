import {lazy} from 'react';
// The package omits this export; keep its source intact and personalize its HTML at build time.
export {SylvaHero} from '@designcodeio/threeui/components/SylvaHero';
export const ThreeDPaper=lazy(()=>import('./shaders/3d-paper/ThreeDPaper').then(module=>({default:module.ThreeDPaper})));
