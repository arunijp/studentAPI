using System;
using System.Data;
using Dapper;

public class DateOnlyHandler : SqlMapper.TypeHandler<DateOnly>
{
    public override void SetValue(IDbDataParameter parameter, DateOnly value)
    {
        parameter.Value = value.ToDateTime(TimeOnly.MinValue);
    }

    public override DateOnly Parse(object value)
    {
        if (value is DateTime dt)
        return
        DateOnly.FromDateTime(dt);

        if (value is DateOnly d)
        return d;

        throw new DataException($"cannot convert {value.GetType()} to DateOnly");
    }
}
