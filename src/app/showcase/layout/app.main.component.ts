import { CommonModule, DOCUMENT, IMAGE_CONFIG } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from '@service/appconfigservice';
import { AppConfigComponent } from './config/app.config.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

@Component({
    selector: 'app-main',
    template: `
        <div class="layout-wrapper" [ngClass]="containerClass" [attr.data-p-theme]="theme">
            <app-topbar (onDarkModeSwitch)="toggleDarkMode()"></app-topbar>
            <app-config (onDarkModeSwitch)="toggleDarkMode()"></app-config>
            <div class="layout-mask" [ngClass]="{ 'layout-mask-active': isMenuActive }" (click)="hideMenu()"></div>
            <div class="layout-content">
                <app-menu></app-menu>
                <div class="layout-content-slot">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [RouterOutlet, CommonModule, AppMenuComponent, AppConfigComponent, AppTopBarComponent]
})
export class AppMainComponent {
    constructor(@Inject(DOCUMENT) private document: Document, private configService: AppConfigService) {}

    get isNewsActive(): boolean {
        return this.configService.state.newsActive;
    }

    get isDarkMode(): boolean {
        return this.configService.config().darkMode;
    }

    get isRippleDisabled(): boolean {
        return this.configService.config().ripple === false;
    }

    get isMenuActive(): boolean {
        return this.configService.state.menuActive;
    }

    get theme(): string {
        return this.configService.config().theme;
    }

    get containerClass() {
        return {
            'layout-news-active': this.isNewsActive,
            'p-ripple-disabled': this.isRippleDisabled,
            'layout-dark': this.isDarkMode,
            'layout-light': !this.isDarkMode
        };
    }

    toggleDarkMode() {
        let newTheme = null;
        const { theme, darkMode } = this.configService.config();

        if (darkMode) {
            newTheme = theme.replace('dark', 'light');
        } else {
            if (theme.includes('light') && theme !== 'fluent-light') newTheme = theme.replace('light', 'dark');
            else newTheme = 'lara-dark-blue';
        }
        this.configService.config.update((config) => ({ ...config, darkMode: !darkMode, theme: newTheme }));
    }

    hideMenu() {
        this.configService.hideMenu();
        DomHandler.unblockBodyScroll('blocked-scroll');
    }
}
