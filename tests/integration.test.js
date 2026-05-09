import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { init, scan, destroy } from '../src/core/engine.js';

describe('Integration: DOM Style Application', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    destroy();
  });

  it('should apply padding to elements', () => {
    document.body.innerHTML = '<div class="head-p-4" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.padding).toBe('1rem');
  });

  it('should apply multiple utilities to the same element', () => {
    document.body.innerHTML = '<div class="head-p-4 head-m-2 head-bg-red-500" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.padding).toBe('1rem');
    expect(el.style.margin).toBe('0.5rem');
    expect(el.style.backgroundColor).toBe('rgb(239, 68, 68)');
  });

  it('should apply flex utilities', () => {
    document.body.innerHTML = '<div class="head-flex head-justify-center head-items-center" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.display).toBe('flex');
    expect(el.style.justifyContent).toBe('center');
    expect(el.style.alignItems).toBe('center');
  });

  it('should apply typography utilities', () => {
    document.body.innerHTML = '<p class="head-text-center head-text-xl head-font-bold" id="test"></p>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.textAlign).toBe('center');
    expect(el.style.fontSize).toBe('1.25rem');
    expect(el.style.fontWeight).toBe('700');
  });

  it('should apply border utilities', () => {
    document.body.innerHTML = '<div class="head-border head-border-2 head-rounded-lg" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.borderWidth).toBe('2px');
    expect(el.style.borderRadius).toBe('0.5rem');
  });

  it('should apply sizing utilities', () => {
    document.body.innerHTML = '<div class="head-w-full head-h-screen" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('100vh');
  });

  it('should handle multiple elements', () => {
    document.body.innerHTML = `
      <div class="head-p-2" id="a"></div>
      <div class="head-p-4" id="b"></div>
      <div class="head-m-8" id="c"></div>
    `;
    init({}, { observe: false });
    expect(document.getElementById('a').style.padding).toBe('0.5rem');
    expect(document.getElementById('b').style.padding).toBe('1rem');
    expect(document.getElementById('c').style.margin).toBe('2rem');
  });

  it('should ignore non-chai classes', () => {
    document.body.innerHTML = '<div class="regular-class head-p-4" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.padding).toBe('1rem');
  });

  it('should apply directional spacing', () => {
    document.body.innerHTML = '<div class="head-px-4 head-my-2" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.paddingLeft).toBe('1rem');
    expect(el.style.paddingRight).toBe('1rem');
    expect(el.style.marginTop).toBe('0.5rem');
    expect(el.style.marginBottom).toBe('0.5rem');
  });

  it('should apply effects utilities', () => {
    document.body.innerHTML = '<div class="head-opacity-50 head-cursor-pointer" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.opacity).toBe('0.5');
    expect(el.style.cursor).toBe('pointer');
  });

  it('should handle nested elements', () => {
    document.body.innerHTML = `
      <div class="head-flex" id="parent">
        <div class="head-p-4 head-bg-blue-500" id="child"></div>
      </div>
    `;
    init({}, { observe: false });
    expect(document.getElementById('parent').style.display).toBe('flex');
    expect(document.getElementById('child').style.padding).toBe('1rem');
    expect(document.getElementById('child').style.backgroundColor).toBe('rgb(59, 130, 246)');
  });

  it('should support arbitrary values', () => {
    document.body.innerHTML = '<div class="head-w-[300px] head-p-[24px]" id="test"></div>';
    init({}, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.width).toBe('300px');
    expect(el.style.padding).toBe('24px');
  });

  it('should respect custom config', () => {
    document.body.innerHTML = '<div class="head-p-4" id="test"></div>';
    init({
      spacingScale: { '4': '2rem' },  // Override scale
    }, { observe: false });
    const el = document.getElementById('test');
    expect(el.style.padding).toBe('2rem');
  });

  it('should work with re-initialization', () => {
    document.body.innerHTML = '<div class="head-p-4" id="test"></div>';
    init({}, { observe: false });
    expect(document.getElementById('test').style.padding).toBe('1rem');
    destroy();
    document.body.innerHTML = '<div class="head-m-8" id="test2"></div>';
    init({}, { observe: false });
    expect(document.getElementById('test2').style.margin).toBe('2rem');
  });
});
