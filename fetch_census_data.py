#!/usr/bin/env python3
"""
Fetch historical ACS 5-Year Data for DC Wards 7 and 8
Using the correct geography codes
"""

import requests
import json
import os
import time

API_KEY = "281496d4826a68c46c46d65299ed8e82b473bbec"
BASE_URL = "https://api.census.gov/data"

# DC State FIPS code
STATE_FIPS = "11"

# Years to fetch (ACS 5-Year estimates)
YEARS = [2022, 2021, 2020, 2019, 2018]

# Key variables we need for the dashboard
# Only fetching the specific fields we need to avoid API errors
KEY_VARIABLES = {
    # Economic (DP03)
    'DP03_0062E': 'Median Household Income',
    'DP03_0063E': 'Mean Household Income',
    'DP03_0009PE': 'Unemployment Rate',
    'DP03_0004E': 'Employed',
    'DP03_0005E': 'Unemployed',
    'DP03_0119PE': 'Families Below Poverty',
    'DP03_0128PE': 'Poverty Rate (All People)',
    'DP03_0074E': 'With SNAP Benefits',
    'DP03_0088E': 'Per Capita Income',
    'DP03_0086E': 'Median Family Income',

    # Housing (DP04)
    'DP04_0001E': 'Total Housing Units',
    'DP04_0002E': 'Occupied Housing Units',
    'DP04_0003E': 'Vacant Housing Units',
    'DP04_0045E': 'Occupied Units (Tenure)',
    'DP04_0046E': 'Owner-Occupied',
    'DP04_0047E': 'Renter-Occupied',
    'DP04_0089E': 'Median Home Value',
    'DP04_0134E': 'Median Gross Rent',
    'DP04_0136E': 'Occupied Units Paying Rent',
    'DP04_0142E': 'Rent 35% or More of Income',

    # Social/Education (DP02)
    'DP02_0001E': 'Total Households',
    'DP02_0053E': 'Population 3+ Enrolled in School',
    'DP02_0054E': 'Nursery School Preschool',
    'DP02_0055E': 'Kindergarten',
    'DP02_0059E': 'Population 25+',
    'DP02_0060E': 'Less than 9th Grade',
    'DP02_0061E': '9th-12th No Diploma',
    'DP02_0062E': 'High School Graduate',
    'DP02_0063E': 'Some College No Degree',
    'DP02_0064E': 'Associates Degree',
    'DP02_0065E': 'Bachelors Degree',
    'DP02_0066E': 'Graduate Degree',
    'DP02_0067PE': 'HS Grad or Higher Percent',
    'DP02_0068PE': 'Bachelors or Higher Percent',
    'DP02_0152E': 'Total Households (Computers)',
    'DP02_0153E': 'With a Computer',
    'DP02_0154E': 'With Broadband Internet',

    # Demographics (DP05)
    'DP05_0001E': 'Total Population',
    'DP05_0002E': 'Male',
    'DP05_0003E': 'Female',
    'DP05_0005E': 'Under 5 Years',
    'DP05_0018E': 'Median Age',
    'DP05_0019E': 'Under 18 Years',
    'DP05_0024E': '65 Years and Over',
    'DP05_0037E': 'White',
    'DP05_0038E': 'Black or African American',
    'DP05_0044E': 'Asian',
    'DP05_0070E': 'Hispanic or Latino',
}

OUTPUT_DIR = "public/data/historical"


def fetch_data_for_year(year: int, variables: list, geography: str, geo_filter: str = None) -> dict:
    """Fetch ACS data for a specific year and geography."""

    var_string = ",".join(variables)

    if geo_filter:
        url = (
            f"{BASE_URL}/{year}/acs/acs5/profile"
            f"?get=NAME,{var_string}"
            f"&for={geography}"
            f"&{geo_filter}"
            f"&key={API_KEY}"
        )
    else:
        url = (
            f"{BASE_URL}/{year}/acs/acs5/profile"
            f"?get=NAME,{var_string}"
            f"&for={geography}"
            f"&key={API_KEY}"
        )

    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()

        # First row is headers
        headers = data[0]
        results = []

        for row in data[1:]:
            row_dict = {}
            for i, header in enumerate(headers):
                val = row[i]
                if val is not None and val != '' and val != 'null':
                    try:
                        if '.' in str(val):
                            row_dict[header] = float(val)
                        else:
                            row_dict[header] = int(val)
                    except (ValueError, TypeError):
                        row_dict[header] = val
                else:
                    row_dict[header] = None
            results.append(row_dict)

        return results

    except requests.exceptions.HTTPError as e:
        print(f"    HTTP Error: {e}")
        return []
    except Exception as e:
        print(f"    Error: {e}")
        return []


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print("Fetching Census ACS 5-Year Data")
    print("=" * 60)

    variables = list(KEY_VARIABLES.keys())

    all_data = {
        'years': YEARS,
        'variables': KEY_VARIABLES,
        'ward7': {},
        'ward8': {},
        'dc': {}
    }

    for year in YEARS:
        print(f"\n📅 Year: {year}")
        print("-" * 40)

        # Fetch DC-wide data (state level)
        print("  Fetching DC-wide data...")
        dc_data = fetch_data_for_year(year, variables, "state:11")

        if dc_data:
            all_data['dc'][year] = dc_data[0]
            print(f"    ✅ DC: {len(dc_data[0])} fields")
        else:
            print("    ❌ DC data failed")

        time.sleep(0.5)  # Rate limiting

        # Fetch ward data using state legislative district (upper chamber)
        print("  Fetching Ward 7 & 8 data...")
        ward_data = fetch_data_for_year(
            year,
            variables,
            "state legislative district (upper chamber):*",
            "in=state:11"
        )

        if ward_data:
            for ward in ward_data:
                ward_name = ward.get('NAME', '')
                if 'Ward 7' in ward_name or ward_name == '7':
                    all_data['ward7'][year] = ward
                    print(f"    ✅ Ward 7: {len(ward)} fields")
                elif 'Ward 8' in ward_name or ward_name == '8':
                    all_data['ward8'][year] = ward
                    print(f"    ✅ Ward 8: {len(ward)} fields")
        else:
            print("    ⚠️  Ward data not available via SLDU, trying county subdivision...")

            # Alternative: try county subdivision
            ward_data = fetch_data_for_year(
                year,
                variables,
                "county subdivision:*",
                "in=state:11&in=county:001"
            )

            if ward_data:
                for ward in ward_data:
                    ward_name = ward.get('NAME', '')
                    if 'Ward 7' in ward_name:
                        all_data['ward7'][year] = ward
                        print(f"    ✅ Ward 7: {len(ward)} fields")
                    elif 'Ward 8' in ward_name:
                        all_data['ward8'][year] = ward
                        print(f"    ✅ Ward 8: {len(ward)} fields")

        time.sleep(0.5)

    # Save combined data
    output_file = f"{OUTPUT_DIR}/acs_timeseries.json"
    with open(output_file, 'w') as f:
        json.dump(all_data, f, indent=2)
    print(f"\n💾 Saved: {output_file}")

    # Create a simplified time-series for each metric
    timeseries = {}

    for var_code, var_name in KEY_VARIABLES.items():
        timeseries[var_code] = {
            'name': var_name,
            'data': []
        }

        for year in YEARS:
            entry = {'year': year}

            if year in all_data['ward7']:
                entry['ward7'] = all_data['ward7'][year].get(var_code)
            if year in all_data['ward8']:
                entry['ward8'] = all_data['ward8'][year].get(var_code)
            if year in all_data['dc']:
                entry['dc'] = all_data['dc'][year].get(var_code)

            timeseries[var_code]['data'].append(entry)

    timeseries_file = f"{OUTPUT_DIR}/metrics_timeseries.json"
    with open(timeseries_file, 'w') as f:
        json.dump(timeseries, f, indent=2)
    print(f"💾 Saved: {timeseries_file}")

    # Print summary
    print("\n" + "=" * 60)
    print("📊 Data Summary")
    print("=" * 60)

    # Show key metrics
    print("\nMedian Household Income (DP03_0062E):")
    for year in YEARS:
        w7 = all_data['ward7'].get(year, {}).get('DP03_0062E', 'N/A')
        w8 = all_data['ward8'].get(year, {}).get('DP03_0062E', 'N/A')
        dc = all_data['dc'].get(year, {}).get('DP03_0062E', 'N/A')
        print(f"  {year}: Ward 7=${w7:,} | Ward 8=${w8:,} | DC=${dc:,}" if isinstance(w7, (int, float)) else f"  {year}: Ward 7={w7} | Ward 8={w8} | DC={dc}")

    print("\nPoverty Rate (DP03_0128PE):")
    for year in YEARS:
        w7 = all_data['ward7'].get(year, {}).get('DP03_0128PE', 'N/A')
        w8 = all_data['ward8'].get(year, {}).get('DP03_0128PE', 'N/A')
        dc = all_data['dc'].get(year, {}).get('DP03_0128PE', 'N/A')
        print(f"  {year}: Ward 7={w7}% | Ward 8={w8}% | DC={dc}%")

    print("\nTotal Population (DP05_0001E):")
    for year in YEARS:
        w7 = all_data['ward7'].get(year, {}).get('DP05_0001E', 'N/A')
        w8 = all_data['ward8'].get(year, {}).get('DP05_0001E', 'N/A')
        dc = all_data['dc'].get(year, {}).get('DP05_0001E', 'N/A')
        print(f"  {year}: Ward 7={w7:,} | Ward 8={w8:,} | DC={dc:,}" if isinstance(w7, (int, float)) else f"  {year}: Ward 7={w7} | Ward 8={w8} | DC={dc}")

    print("\n✅ Done!")


if __name__ == "__main__":
    main()
