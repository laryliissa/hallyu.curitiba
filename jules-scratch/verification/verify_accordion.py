
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # The file path needs to be absolute.
        await page.goto(f'file://{os.path.abspath("index.html")}')
        await page.locator("#agenda").screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

if __name__ == '__main__':
    import os
    asyncio.run(main())
