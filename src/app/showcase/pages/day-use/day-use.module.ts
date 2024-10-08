import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { UIKitRoutingModule } from "./day-use-routing.module";
import { DayUseComponent } from "./day-use.component";
import { InputTextModule } from "primeng/inputtext";
import { SplitButtonModule } from "primeng/splitbutton";
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { CalendarModule } from "primeng/calendar";
import { FloatLabelModule } from "primeng/floatlabel";
import { StepperModule } from "primeng/stepper";
import { DialogModule } from "primeng/dialog";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
  imports: [
    CommonModule,
    UIKitRoutingModule,
    HttpClientModule,
    DialogModule,
    StepperModule,
    FloatLabelModule,
    CalendarModule,
    TableModule,
    TagModule,
    PanelModule,
    SplitButtonModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
  ],

  declarations: [DayUseComponent],
})
export class DayUseModule {}
