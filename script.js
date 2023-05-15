
// Array de usuarios
const users = [
  {
    name: "Alejandro",
    document: "1000380521",
    password: "AlejandroPerez1021",
    typeOfUser: "client",
  },
  {
    name: "Camila",
    document: "1001066793",
    password: "CamilaSanchez9366",
    typeOfUser: "client",
  },
  {
    name: "Sebastian",
    document: "101136587",
    password: "SebastianCifuentes1158",
    typeOfUser: "administrator",
  },
  {
    name: "Susana",
    document: "43596827",
    password: "SusanaGiraldo3582",
    typeOfUser: "client",
  },
  {
    name: "David",
    document: "1023554827",
    password: "DavidQuintero4900",
    typeOfUser: "administrator",
  },
  {
    name: "Manuela",
    document: "49985074",
    password: "ManuelaSaenz5099",
    typeOfUser: "client",
  },
];

// Array de información del cajero
const cashierMoney = [
  {
    denomination: 100000,
    amount: 0,
    total: 0,
    deliveredQuantity: 0,
  },
  {
    denomination: 50000,
    amount: 0,
    total: 0,
    deliveredQuantity: 0,
  },
  {
    denomination: 20000,
    amount: 0,
    total: 0,
    deliveredQuantity: 0,
  },
  {
    denomination: 10000,
    amount: 0,
    total: 0,
    deliveredQuantity: 0,
  },
  {
    denomination: 5000,
    amount: 0,
    total: 0,
    deliveredQuantity: 0,
  },
];

let balance = 0;
let validationMoney = 0;
let validationAmount = true;
let totalMoneyInCashier = "";
let totalDenominationDelivered = "";
const x = true;

// Ciclo para procurar que el cajero funcione infinitamente
while (x === true) {
  const loginDocument = prompt("ingrese su documento de identidad");
  const loginPassword = prompt("ingrese su contraseña");

  // busca el docuento introducido por el usuario para mirar si existe o no.
  const userFound = users.find(
    (userItem) => userItem.document === loginDocument
  );

  // validación de que el documento del usuario exista
  if (!userFound) {
    // mensaje en caso de que el documento del usuario no exista
    alert("El usuario no existe");
    continue;
  } else if (userFound.password !== loginPassword) {
    // Si el documento existe entonces valida que la contraseña sea correcta
    alert("Contraseña incorrecta");
  } else {
    // En caso tal de que los datos esten correctos, proseguimos a 
    // validar con la funcion validationRole si es administrador o cliente
    validationRole(userFound.typeOfUser);
    continue;
  }
}

// función para validar si es administrador o cliente
function validationRole(param) {
  if (param === "administrator") {
    // Si es administrador llamaremos la función administrator
    administrator();
  }
  if (param === "client") {
    // Si es cliente primero validamos que el cajero tenga dinero
    cashierMoney.forEach((money) => {
      if (money.amount !== 0) {
        validationMoney = validationMoney + 1;
      }
    });

    if (validationMoney === 0) {
       // Mensaje a mostrar si el cajero no tiene dinero
      alert("El cajero esta en mantenimiento vuelva pronto");
    } else {
       // Si el cajero tiene dinero, se llamara la funcion client
      client();
    }
  }
}

// función para realizar las funciones de administrador
function administrator() {
  alert(
    "Bienvenido, por favor a continuación indique cuántos billetes de 100000, 50000, 20000, 10000 y 5000 mil pesos va a introducir "
  );

  // ForEach utilizado para introducir billetes por cada denominación
  cashierMoney.forEach((money) => {
    money.amount += Number(
      prompt(
        `Ingresa la cantidad de billetes de ${money.denomination} que deseas ingresar`
      )
    );
    money.total = money.denomination * money.amount;
    balance += money.total;
  });

  // Map y Join utilizado para imprimir la información de cada billete en un solo alert
  totalMoneyInCashier = cashierMoney
    .map(
      (money) =>
        `El total de dinero en billetes de ${money.denomination} es ${money.total}.\n`
    )
    .join("");

  alert(totalMoneyInCashier);
  alert(`El dinero total metido en el cajero es ${balance}`);
  balance = 0;
}

// función para realizar las funciones de cliente
function client() {
  let totalOrder = Number(prompt("Cuanto Dinero desea retirar?"));

  cashierMoney.forEach((money) => {
    balance += money.total;
  });

  // validamos de que lo que quiere retirar el cliente no exceda lo que hay disponible en cajero
  if (totalOrder > balance) {
    alert(`El cajero solo tiene ${balance} disponible, vuelve a intentarlo`);
    balance = 0;
    return;
  } else {
      // While utilizado para redondear el valor intrudocido a retirar y que solo sean multiplos de 5000
    while (validationAmount) {
      if (totalOrder % 5000 === 0) {
        validationAmount = false;
        continue;
      } else {
        totalOrder = totalOrder - 1000;
        continue;
      }
    }
  }
  
  validationAmount = true;
  alert(`La cantidad entregada a continuación será: ${totalOrder}`);

  // For each utiliado para restar el dinero retirado del cajero y 
  // sumar a la propiedad deliveredQuantity la cantidad de billetes retirados
  cashierMoney.forEach((money) => {
    if (money.amount != 0) {
      while (money.denomination <= totalOrder && money.amount !== 0) {
        money.total -= money.denomination;
        totalOrder -= money.denomination;
        money.deliveredQuantity++;
        money.amount--;
        balance -= money.denomination;
      }
    }
  });

  // Map y Join utilizado para imprimir la información de cada billete retirado en un solo alert
  totalDenominationDelivered = cashierMoney
    .map((money) => {
      if (money.deliveredQuantity === 0) return;
      return `La cantidad de billetes entregados de ${money.denomination} es ${money.deliveredQuantity}.\n`;
    })
    .join("");

  alert(totalDenominationDelivered);
  alert(`Lo que queda en el cajero es ${balance}`);

  cashierMoney.forEach((money) => (money.deliveredQuantity = 0));
  balance = 0;
}

