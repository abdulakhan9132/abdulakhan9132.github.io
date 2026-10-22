import {lazy} from 'react';
// The 1.2.0 package omits these two exports; defer their unchanged source until needed.
export {SylvaHero} from '@designcodeio/threeui/components/SylvaHero';
export const ThreeDPaper=lazy(()=>import('./shaders/3d-paper/ThreeDPaper').then(module=>({default:module.ThreeDPaper})));
export const GlassAiButton=lazy(()=>import('./shaders/glass-ai-button/GlassAiButton').then(module=>({default:module.GlassAiButton})));
