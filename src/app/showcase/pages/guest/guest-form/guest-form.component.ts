import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { AppConfigService } from "@service/appconfigservice";
import { Customer } from "@domain/customer";
import { CustomerService } from "@service/customerservice";
import { Table } from "primeng/table";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { NewGuest } from "@doc/dynamicdialog/new-guest";
import { ActivatedRoute, Router } from "@angular/router";
import { Guest } from "@layout/models/guest.model";

@Component({
  templateUrl: "./guest-form.component.html",
  providers: [DialogService],
  styleUrls: ["guest-form.component.scss"],
})
export class GuestFormComponent {
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;
  subscription: Subscription;
  customers!: Customer[];
  searchValue: string | undefined;
  date: string | Date;
  reservationHistoryList!: Array<any>;
  guest: Guest;
  newGuestMode: boolean = true;

  constructor(
    private configService: AppConfigService,
    private titleService: Title,
    private customerService: CustomerService,
    public dialogService: DialogService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.titleService.setTitle("RoomWise");

    // - Pre reservado
    // - Reservado
    // - Hospedado
    // -Em limpeza
    // Finalizado

    this.reservationHistoryList = [
      {
        situation: "preBooked",
        uhName: "Quanrto 01",
        reservationId: "HO:000001",
        checkIn: "16/01/2003",
        checkOut: "30/01/2003",
        dayNumbers: 2,
        quantity: 2,
      },
      {
        situation: "booked",
        uhName: "Quanrto 01",
        reservationId: "HO:000001",
        checkIn: "16/01/2003",
        checkOut: "30/01/2003",
        dayNumbers: 2,
        quantity: 2,
      },
      {
        situation: "hosted",
        uhName: "Quanrto 01",
        reservationId: "HO:000001",
        checkIn: "16/01/2003",
        checkOut: "30/01/2003",
        dayNumbers: 2,
        quantity: 2,
      },
      {
        situation: "inCleaning",
        uhName: "Quanrto 01",
        reservationId: "HO:000001",
        checkIn: "16/01/2003",
        checkOut: "30/01/2003",
        dayNumbers: 2,
        quantity: 2,
      },
      {
        situation: "finalized",
        uhName: "Quanrto 01",
        reservationId: "HO:000001",
        checkIn: "16/01/2003",
        checkOut: "30/01/2003",
        dayNumbers: 2,
        quantity: 2,
      },
    ];
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["guest"]) {
        this.guest = JSON.parse(params["guest"]);
        console.log(this.guest);
      } else {
        this.guest = new Guest;
      }
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id === "detailGuest") {
        this.newGuestMode = false;
      } else {
        this.newGuestMode = true;
      }
    });

    this.customerService
      .getCustomersLarge()
      .then((customers) => (this.customers = customers));
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = "";
  }

  get isDarkMode(): boolean {
    return this.configService.config().darkMode;
  }

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
      case "ativo":
        return "success";

      case "inativo":
        return "danger";
    }
  }

  getSituationLabel(situation: string) {
    if (situation == "preBooked") {
      return "Pré-Reservado";
    } else if (situation == "booked") {
      return "Reservado";
    } else if (situation == "hosted") {
      return "Hospedado";
    } else if (situation == "inCleaning") {
      return "Em limpeza";
    } else if (situation == "finalized") {
      return "Finalizado";
    }
  }

  getSituationTagColor(situation: string) {
    if (situation == "preBooked") {
      return "warning";
    } else if (situation == "booked") {
      return "primary";
    } else if (situation == "hosted") {
      return "danger";
    } else if (situation == "inCleaning") {
      return "secondary";
    } else if (situation == "finalized") {
      return "success";
    }
  }

  navigateToGuestList() {
    this.router.navigate(["/guest"]);
  }
}
