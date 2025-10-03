#  Public Data Source Worksheet

## Named Public GET Endpoint

**API Name:** Rolz Dice Roller API  
**Endpoint URL:** `https://rolz.org/api/?1d6.json`  
**Use Case in Game:** Random damage generation for player and enemy attacks.

---

##  Tiny Sample Request

**HTTP Request:**

GET https://rolz.org/api/?1d6.json

**Sample Response**


fetch('https://rolz.org/api/?1d6.json')
* .then(r => r.json())
 * .then(console.log)
 * .catch(console.error);

Promise {< pending >}
{input: '1d6', result: 5, details: '5', code: '', illustration: '<span style="color: gray;"></span> <span class="dc_dice_a"></span><span class="dc_dice_d">D6</span>', …}

## CORS
* Cors Allowed 

## Caching
**Cache-Control :** `no-store, no-cache, must-revalidate`
**Pragma:** `no cache`
