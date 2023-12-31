import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MessageService } from "./services/message.service";
import { DecimalPipe } from "@angular/common";
import { ConfigService } from "./services/config.service";
import { ApplicationService } from "./services/application.service";
import { UserService } from "./services/user.service";
import { RestrictionService } from "./services/restriction.service";
import { ExampleValueService } from "./services/exampleValue.service";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule
  ],
  providers: [MessageService, DecimalPipe, ConfigService, ApplicationService, UserService, RestrictionService, ExampleValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
