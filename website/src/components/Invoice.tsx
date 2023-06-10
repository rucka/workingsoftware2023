import styled from 'styled-components'
import { Invoice } from '../controller'

export function Invoice({ invoice }: { invoice: Invoice }) {
  return (
    <InvoiceContainer>
      <InvoiceTable>
        <tbody>
          <InvoiceTableTopRow>
            <td colSpan={2}>
              <InvoiceTable>
                <tbody>
                  <tr>
                    <td></td>
                    <RightColumnCell>
                      Invoice #: {invoice.number}
                      <br />
                      Created: {invoice.created}
                      <br />
                      {invoice.due}
                    </RightColumnCell>
                  </tr>
                </tbody>
              </InvoiceTable>
            </td>
          </InvoiceTableTopRow>

          <InvoiceTableInformation>
            <td colSpan={2}>
              <InvoiceTable>
                <tbody>
                  <tr>
                    <td>
                      {invoice.issuer.name}
                      <br />
                      {invoice.issuer.address}
                      <br />
                      {invoice.issuer.city}
                    </td>

                    <RightColumnCell>
                      {invoice.customer.name}
                      <br />
                      {invoice.customer.address}
                      <br />
                      {invoice.customer.city}
                      <br />
                      {invoice.customer.email}
                    </RightColumnCell>
                  </tr>
                </tbody>
              </InvoiceTable>
            </td>
          </InvoiceTableInformation>

          <InvoiceTableHeading>
            <td>Item</td>
            <RightColumnCell>Price</RightColumnCell>
          </InvoiceTableHeading>

          {invoice.items.map((item, i) => {
            if (i === invoice.items.length - 1) {
              return (
                <InvoiceTableItemLast key={i}>
                  <td>{item.name}</td>
                  <RightColumnCell>{item.amount}</RightColumnCell>
                </InvoiceTableItemLast>
              )
            }
            return (
              <InvoiceTableItem key={i}>
                <td>{item.name}</td>
                <RightColumnCell>{item.amount}</RightColumnCell>
              </InvoiceTableItem>
            )
          })}

          <InvoiceTableTotal>
            <td></td>
            <RightColumnCell>Total: {invoice.total}</RightColumnCell>
          </InvoiceTableTotal>
        </tbody>
      </InvoiceTable>
    </InvoiceContainer>
  )
}

export const InvoiceContainer = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 100px;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
`

export const InvoiceTable = styled.table`
  width: 100%;
  line-height: inherit;
  text-align: left;
  border-collapse: collapse;
  td {
    padding: 5px;
    vertical-align: top;
  }
`

export const RightColumnCell = styled.td`
  text-align: right;
`

export const InvoiceTableTopRow = styled.tr`
  td {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: 600px) {
    td {
      width: 100%;
      display: block;
      text-align: center;
    }
  }
`
export const InvoiceTableInformation = styled.tr`
  td {
    padding-bottom: 40px;
  }
  @media only screen and (max-width: 600px) {
    td {
      width: 100%;
      display: block;
      text-align: center;
    }
  }
`

export const InvoiceTableHeading = styled.tr`
  td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }
`

export const InvoiceTableItem = styled.tr`
  td {
    border-bottom: 1px solid #eee;
  }
`

export const InvoiceTableItemLast = styled(InvoiceTableItem)`
  td {
    border-bottom: none;
  }
`

export const InvoiceTableTotal = styled.tr`
  td:nth-child(2) {
    border-top: 2px solid #eee;
    font-weight: bold;
  }
`
